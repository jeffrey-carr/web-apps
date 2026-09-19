package main

import (
	"context"
	"errors"
	"federation/sdk"
	"fmt"
	"go-common/jcontext"
	"go-common/jhttp"
	jerrors "go-common/jhttp/errors"
	"go-common/jlogging"
	"go-common/services/jmongo"
	"go-common/types"
	"go-common/utils"
	"slices"
	"strings"
	"time"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.uber.org/multierr"
)

const MaxTournamentsForUser = 5
const TournamentCodePathKey = "tournamentCode"
const BracketUUIDPathKey = "bracketUUID"
const GoldenBracketUUID = "00000000-0000-0000-0000-000000000000"

// Controller controls the stuff
type Controller struct {
	tournamentsRepo jmongo.Mongo[Tournament]
	bracketsRepo    jmongo.Mongo[Bracket]
	logger          jlogging.Logger
	federationSDK   sdk.SDK
}

// NewController creates a new controller
func NewController(
	tournamentsRepo jmongo.Mongo[Tournament],
	bracketsRepo jmongo.Mongo[Bracket],
	logger jlogging.Logger,
	federationSDK sdk.SDK,
) Controller {
	return Controller{
		tournamentsRepo: tournamentsRepo,
		bracketsRepo:    bracketsRepo,
		logger:          logger,
		federationSDK:   federationSDK,
	}
}

// CreateTournament creates a new tournament
func (c Controller) CreateTournament(ctx context.Context, r jhttp.RequestData[CreateTournamentRequest]) (*Tournament, *jerrors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}

	logger := c.logger.WithFields(logrus.Fields{
		jlogging.UserUUIDLogLabel: user.UUID,
		"action":                  "createTournament",
	})

	if strings.TrimSpace(r.Body.Title) == "" {
		return nil, jerrors.NewBadRequestError("Title is required")
	}

	existingTournaments, err := c.tournamentsRepo.CountWithFilter(ctx, bson.M{"userUUID": user.UUID})
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}
	if existingTournaments-1 == MaxTournamentsForUser {
		logger.WithField("max", MaxTournamentsForUser).Error("user has max tournaments")
		return nil, jerrors.NewBadRequestError("Max number of tournaments already created")
	}

	var joinCode string
	iter := 0
	for joinCode == "" && iter < 100 {
		iter++
		code := GenerateCode()
		exists, err := c.checkTournamentCode(ctx, code)
		if err != nil {
			return nil, jerrors.NewInternalServerError(err)
		}
		if !exists {
			joinCode = code
		}
	}
	if joinCode == "" {
		logger.Error("failed to generate join code")
		return nil, jerrors.NewInternalServerError(errors.New("Failed to generate join code"))
	}
	logger.WithField("joinCode", joinCode)

	newTournament := Tournament{
		Title:     r.Body.Title,
		OwnerUUID: user.UUID,
		JoinCode:  joinCode,
		CreatedAt: time.Now(),
	}
	err = c.tournamentsRepo.InsertItem(ctx, newTournament)
	if err != nil {
		logger.WithError(err).Error("failed to create tournament")
		return nil, jerrors.NewInternalServerError(err)
	}
	logger.WithField("joinCode", newTournament.JoinCode).Info("created new tournament")

	return &newTournament, nil
}

// GetTournament gets a tournament by its join code
func (c Controller) GetTournament(ctx context.Context, r jhttp.RequestData[struct{}]) (*Tournament, *jerrors.JHTTPError) {
	tournamentCode := strings.TrimSpace(r.PathValues[TournamentCodePathKey])
	if tournamentCode == "" {
		return nil, jerrors.NewBadRequestError("Tournament code is required")
	}

	logger := c.logger.WithFields(logrus.Fields{
		"action": "getTournament",
		"code":   tournamentCode,
	})

	tournament, err := c.tournamentsRepo.GetByUUID(ctx, tournamentCode)
	if err == types.ErrNotFound {
		return nil, jerrors.NewNotFoundError(tournamentCode)
	}
	if err != nil {
		logger.WithError(err).Error("failed to get tournament")
		return nil, jerrors.NewInternalServerError(err)
	}

	user, err := c.federationSDK.GetUserByUUID(ctx, tournament.OwnerUUID)
	// Don't blow up the whole request if we can't get the owner, the FE
	// will fall back to defaults
	if err == nil {
		tournament.OwnerFName = user.FName
		tournament.OwnerLName = user.LName
		tournament.OwnerCharacter = user.Character
	}

	return &tournament, nil
}

// GetTournamentsForUser gets all tournaments for the logged in user
func (c Controller) GetTournamentsForUser(ctx context.Context, _ jhttp.RequestData[struct{}]) (*[]Tournament, *jerrors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}

	logger := c.logger.WithFields(logrus.Fields{
		"action":                  "getTournamentsForUser",
		jlogging.UserUUIDLogLabel: user.UUID,
	})

	// Get tournaments the user owns
	tournaments, err := c.tournamentsRepo.GetByKey(ctx, "ownerUUID", user.UUID)
	if err != nil && err != types.ErrNotFound {
		logger.WithError(err).Error("failed to get tournaments for user")
		return nil, jerrors.NewInternalServerError(err)
	}

	// Get tournaments the user has joined
	userBrackets, err := c.bracketsRepo.GetByKey(ctx, "userUUID", user.UUID)
	if err != nil && err != types.ErrNotFound {
		return nil, jerrors.NewInternalServerError(err)
	}

	tournamentMap := make(map[string]Tournament)
	for _, t := range tournaments {
		tournamentMap[t.JoinCode] = t
	}

	if len(userBrackets) > 0 {
		var joinedCodes []string
		for _, b := range userBrackets {
			joinedCodes = append(joinedCodes, b.TournamentUUID)
		}
		joinedTournaments, err := c.tournamentsRepo.GetByUUIDs(ctx, joinedCodes)
		if err == nil {
			for _, t := range joinedTournaments {
				tournamentMap[t.JoinCode] = t
			}
		}
	}

	var allTournaments []Tournament
	for _, t := range tournamentMap {
		allTournaments = append(allTournaments, t)
	}

	if len(allTournaments) == 0 {
		return nil, jerrors.NewNotFoundError[*struct{}](nil)
	}

	return &allTournaments, nil
}

// UpdateTournament updates a tournament
func (c Controller) UpdateTournament(ctx context.Context, r jhttp.RequestData[UpdateTournamentRequest]) (*Tournament, *jerrors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}
	logger := c.logger.WithFields(logrus.Fields{
		jlogging.UserUUIDLogLabel: user.UUID,
		"action":                  "update",
	})

	tournamentUUID := strings.TrimSpace(r.Body.TournamentUUID)
	title := strings.TrimSpace(r.Body.Title)
	logger = logger.WithFields(logrus.Fields{"tournamentUUID": tournamentUUID, "title": title})
	if tournamentUUID == "" || title == "" {
		logger.Error("missing tournament id or title")
		return nil, jerrors.NewBadRequestError("Tournament ID and title required")
	}

	tournament, err := c.tournamentsRepo.GetByUUID(ctx, r.Body.TournamentUUID)
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}
	if tournament.OwnerUUID != user.UUID {
		return nil, jerrors.NewForbiddenError()
	}

	tournament.Title = title
	err = c.tournamentsRepo.UpdateItem(ctx, tournament.JoinCode, tournament)
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	return &tournament, nil
}

func (c Controller) DeleteTournament(ctx context.Context, r jhttp.RequestData[struct{}]) (*struct{}, *jerrors.JHTTPError) {
	tournamentCode := strings.TrimSpace(r.PathValues[TournamentCodePathKey])
	if tournamentCode == "" {
		return nil, jerrors.NewBadRequestError("Tournament code is required")
	}

	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}

	tournament, err := c.tournamentsRepo.GetByUUID(ctx, tournamentCode)
	if err == types.ErrNotFound {
		return nil, jerrors.NewNotFoundError(tournamentCode)
	}
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	if user.UUID != tournament.OwnerUUID && !user.IsAdmin {
		return nil, jerrors.NewForbiddenError()
	}

	err = c.tournamentsRepo.DeleteItem(ctx, tournament.JoinCode)
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	return nil, nil
}

// CheckTournamentJoinCode checks if a tournament exists under the provided join code
func (c Controller) CheckTournamentJoinCode(ctx context.Context, r jhttp.RequestData[struct{}]) (*CheckTournamentUUIDResponse, *jerrors.JHTTPError) {
	tournamentCode := strings.TrimSpace(r.PathValues[TournamentCodePathKey])
	if tournamentCode == "" {
		return nil, jerrors.NewBadRequestError("Tournament ID is required")
	}

	logger := c.logger.WithFields(logrus.Fields{
		"action": "checkTournamentJoinCode",
		"code":   tournamentCode,
	})

	exists, err := c.checkTournamentCode(ctx, tournamentCode)
	if err != nil {
		logger.WithError(err).Error("failed to check tournament join code")
		return nil, jerrors.NewInternalServerError(err)
	}

	return &CheckTournamentUUIDResponse{Exists: exists}, nil
}

func (c Controller) checkTournamentCode(ctx context.Context, code string) (bool, error) {
	_, err := c.tournamentsRepo.GetByUUID(ctx, code)
	if err == types.ErrNotFound {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return true, nil
}

// CreateBracket creates a new bracket. It's also how a user joins a tournament
func (c Controller) CreateBracket(ctx context.Context, r jhttp.RequestData[CreateBracketRequest]) (*Bracket, *jerrors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}

	logger := c.logger.WithFields(logrus.Fields{
		jlogging.UserUUIDLogLabel: user.UUID,
		"action":                  "createBracket",
	})

	// Validate request data
	tournamentJoinCode := strings.TrimSpace(r.PathValues[TournamentCodePathKey])
	title := strings.TrimSpace(r.Body.Title)
	choices := r.Body.Choices
	logger = logger.WithFields(logrus.Fields{
		"tournamentUUID": tournamentJoinCode,
		"title":          title,
		"choices":        choices,
	})

	if tournamentJoinCode == "" {
		return nil, jerrors.NewBadRequestError("tournament join code is required")
	}
	if title == "" {
		return nil, jerrors.NewBadRequestError("bracket title is required")
	}
	if !validateChoices(choices, 0) {
		return nil, jerrors.NewBadRequestError("choices are not valid")
	}

	// Make sure user doesn't already have a bracket for this tournament
	userBrackets, err := c.bracketsRepo.GetByKey(ctx, "userUUID", user.UUID)
	if err != nil && err != types.ErrNotFound {
		return nil, jerrors.NewInternalServerError(err)
	}
	if slices.ContainsFunc(userBrackets, func(bracket Bracket) bool { return bracket.TournamentUUID == tournamentJoinCode }) {
		return nil, jerrors.NewBadRequestError("You already have a bracket for this tournament")
	}

	bracket := Bracket{
		UUID:           utils.NewUUID(),
		Title:          title,
		TournamentUUID: tournamentJoinCode,
		UserUUID:       user.UUID,
		Choices:        choices,
	}

	goldenBracket, err := c.bracketsRepo.GetByUUID(ctx, GoldenBracketUUID)
	if err != nil && err != types.ErrNotFound {
		return nil, jerrors.NewInternalServerError(err)
	}
	if err == nil {
		bracket.Score = scoreChoices(&bracket.Choices, &goldenBracket.Choices, 0)
	}

	err = c.bracketsRepo.InsertItem(ctx, bracket)
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	return &bracket, nil
}

func (c Controller) GetTournamentBrackets(ctx context.Context, r jhttp.RequestData[struct{}]) (*[]Bracket, *jerrors.JHTTPError) {
	tournamentCode := strings.TrimSpace(r.PathValues[TournamentCodePathKey])
	if tournamentCode == "" {
		return nil, jerrors.NewBadRequestError("Tournament code is required")
	}

	brackets, err := c.bracketsRepo.GetByKey(ctx, "tournamentUUID", tournamentCode)
	if err != nil && err != types.ErrNotFound {
		return nil, jerrors.NewInternalServerError(err)
	}

	var userUUIDs []string
	for _, b := range brackets {
		userUUIDs = append(userUUIDs, b.UserUUID)
	}

	var usersMap map[string]types.CommonUser
	if len(userUUIDs) > 0 {
		users, err := c.federationSDK.GetUsersByUUIDs(ctx, userUUIDs)
		if err == nil && users != nil {
			usersMap = make(map[string]types.CommonUser)
			for _, u := range *users {
				usersMap[u.UUID] = u
			}
		}
	}

	brackets = utils.Map(brackets, func(bracket Bracket) Bracket {
		if usersMap != nil {
			if u, ok := usersMap[bracket.UserUUID]; ok {
				bracket.UserFName = u.FName
				bracket.UserLName = u.LName
				bracket.UserCharacter = u.Character
			}
		}
		return bracket
	})

	return &brackets, nil
}

func (c Controller) GetBrackets(ctx context.Context, r jhttp.RequestData[GetBracketsRequest]) (*[]Bracket, *jerrors.JHTTPError) {
	if len(r.Body.BracketUUIDs) == 0 {
		return nil, jerrors.NewBadRequestError("At least one uuid is required")
	}

	brackets, err := c.bracketsRepo.GetByUUIDs(ctx, r.Body.BracketUUIDs)
	if err == types.ErrNotFound {
		return nil, jerrors.NewNotFoundError(r.Body.BracketUUIDs)
	}
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	return &brackets, nil
}

func (c Controller) GetBracketsForUser(ctx context.Context, _ jhttp.RequestData[struct{}]) (*[]Bracket, *jerrors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}

	brackets, err := c.bracketsRepo.GetByKey(ctx, "userUUID", user.UUID)
	if err != nil && err != types.ErrNotFound {
		return nil, jerrors.NewInternalServerError(err)
	}

	return &brackets, nil
}

// UpdateBracket updates a bracket
func (c Controller) isTournamentLocked(ctx context.Context) bool {
	goldenBracket, err := c.bracketsRepo.GetByUUID(ctx, GoldenBracketUUID)
	if err != nil {
		return false
	}
	return treeHasPick(goldenBracket.Choices, 0)
}

func treeHasPick(node BracketTree[Bear], depth int) bool {
	if depth < 4 && node.Winner.ID != 0 {
		return true
	}
	if node.Left != nil && treeHasPick(*node.Left, depth+1) {
		return true
	}
	if node.Right != nil && treeHasPick(*node.Right, depth+1) {
		return true
	}
	return false
}

func (c Controller) UpdateBracket(ctx context.Context, r jhttp.RequestData[UpdateBracketRequest]) (*Bracket, *jerrors.JHTTPError) {
	bracketUUID := strings.TrimSpace(r.PathValues[BracketUUIDPathKey])
	if bracketUUID == "" {
		return nil, jerrors.NewBadRequestError("Bracket UUID is required")
	}
	if bracketUUID == GoldenBracketUUID {
		return nil, jerrors.NewForbiddenError()
	}

	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}

	bracket, err := c.bracketsRepo.GetByUUID(ctx, bracketUUID)
	if err == types.ErrNotFound {
		return nil, jerrors.NewNotFoundError(bracketUUID)
	}
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	if bracket.UserUUID != user.UUID {
		return nil, jerrors.NewForbiddenError()
	}

	if r.Body.Title != nil {
		newTitle := strings.TrimSpace(*r.Body.Title)
		if newTitle == "" {
			return nil, jerrors.NewBadRequestError("Title is invalid")
		}
		bracket.Title = newTitle
	}
	if r.Body.Choices != nil {
		if c.isTournamentLocked(ctx) {
			return nil, jerrors.NewForbiddenError()
		}

		newChoicesAreValid := validateChoices(*r.Body.Choices, 0)
		if !newChoicesAreValid {
			return nil, jerrors.NewBadRequestError("Choices are not valid")
		}

		bracket.Choices = *r.Body.Choices
	}

	err = c.bracketsRepo.UpdateItem(ctx, bracket.UUID, bracket)
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	return &bracket, nil
}

func (c Controller) DeleteBracket(ctx context.Context, r jhttp.RequestData[struct{}]) (*Bracket, *jerrors.JHTTPError) {
	user, userIsPresent := jcontext.GetUser(ctx)
	if !userIsPresent {
		return nil, jerrors.NewUnauthorizedError()
	}

	bracketUUID := strings.TrimSpace(r.PathValues[BracketUUIDPathKey])
	if bracketUUID == "" {
		return nil, jerrors.NewBadRequestError("Bracket UUID is required")
	}

	bracket, err := c.bracketsRepo.GetByUUID(ctx, bracketUUID)
	if err == types.ErrNotFound {
		return nil, jerrors.NewNotFoundError(bracketUUID)
	}
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	tournament, err := c.tournamentsRepo.GetByUUID(ctx, bracket.TournamentUUID)
	if err != nil && err != types.ErrNotFound {
		return nil, jerrors.NewInternalServerError(err)
	}

	isTournamentOwner := tournament.OwnerUUID == user.UUID
	if !user.IsAdmin && bracket.UserUUID != user.UUID && !isTournamentOwner {
		return nil, jerrors.NewForbiddenError()
	}

	err = c.bracketsRepo.DeleteItem(ctx, bracket.UUID)
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	return &bracket, nil
}

// GetGoldenBracket gets the golden bracket
func (c Controller) GetGoldenBracket(ctx context.Context, _ jhttp.RequestData[struct{}]) (*Bracket, *jerrors.JHTTPError) {
	bracket, err := c.bracketsRepo.GetByUUID(ctx, GoldenBracketUUID)
	if err == types.ErrNotFound {
		return &Bracket{}, nil
	}
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	return &bracket, nil
}

// AdminUpdateGoldenBracket is how the admin updates the bracket results
func (c Controller) AdminUpdateGoldenBracket(ctx context.Context, r jhttp.RequestData[UpdateBracketRequest]) (*Bracket, *jerrors.JHTTPError) {
	bracket, err := c.bracketsRepo.GetByUUID(ctx, GoldenBracketUUID)
	isNew := false
	if err == types.ErrNotFound {
		bracket = Bracket{
			UUID:     GoldenBracketUUID,
			Title:    "Golden Bracket",
			UserUUID: GoldenBracketUUID,
		}
		err = nil
		isNew = true
	}
	if err != nil {
		fmt.Printf("failed to update admin golden bracket: %s\n", err.Error())
		return nil, jerrors.NewInternalServerError(err)
	}

	if r.Body.Title != nil {
		bracket.Title = *r.Body.Title
	}
	if r.Body.Choices != nil {
		bracket.Choices = *r.Body.Choices
	}

	if isNew {
		err = c.bracketsRepo.InsertItem(ctx, bracket)
	} else {
		err = c.bracketsRepo.UpdateItem(ctx, GoldenBracketUUID, bracket)
	}
	if err != nil {
		return nil, jerrors.NewInternalServerError(err)
	}

	err = c.updateBracketScores(ctx, bracket.Choices)
	if err != nil {
		return &bracket, jerrors.NewInternalServerError(err)
	}

	return &bracket, nil
}

func (c Controller) updateBracketScores(ctx context.Context, goldenBracket BracketTree[Bear]) error {
	logger := c.logger.WithFields(logrus.Fields{
		"action":        "updateBracketScores",
		"goldenBracket": goldenBracket,
	})
	brackets, err := c.bracketsRepo.GetAll(ctx)
	if err != nil {
		logger.WithError(err).Error("failed to get brackets")
		return err
	}

	var merrs error
	var failed int
	for _, bracket := range brackets {
		bracket.Score = scoreChoices(&bracket.Choices, &goldenBracket, 0)
		err = c.bracketsRepo.UpdateItem(ctx, bracket.UUID, bracket)
		if err != nil {
			logger.WithFields(logrus.Fields{
				"bracketUUID": bracket.UUID,
				"newScore":    bracket.Score,
			}).WithError(err).Error("failed to update score for bracket")
			merrs = multierr.Append(merrs, err)
			failed++
		}
	}

	logger.WithFields(logrus.Fields{
		"updated": len(brackets) - failed,
		"failed":  failed,
	}).Info("updated bracket scores")

	return merrs
}
