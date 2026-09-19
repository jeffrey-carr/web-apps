package main

import (
	"errors"
	"federation/sdk"
	"fmt"
	"go-common/constants"
	"go-common/jhttp"
	"go-common/jhttp/middlewares"
	"go-common/jlogging"
	"go-common/services/jmongo"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Config struct {
	Environment      constants.Environment
	Port             string
	MongoURL         string
	FederationAPIKey string
	AxiomAPIKey      string
}

func loadConfig() (Config, error) {
	var environment constants.Environment
	environmentStr := os.Getenv("FAT_BEARS_ENVIRONMENT")
	if environmentStr == string(constants.EnvProd) {
		environment = constants.EnvProd
	} else {
		environment = constants.EnvDev
	}

	port := os.Getenv("FAT_BEARS_PORT")
	if port == "" {
		port = "8080"
	}

	mongoURL := os.Getenv("FAT_BEARS_MONGO_URL")
	if mongoURL == "" {
		return Config{}, errors.New("mongo url not provided")
	}

	federationAPIKey := os.Getenv("FAT_BEARS_FEDERATION_API_KEY")
	if federationAPIKey == "" {
		return Config{}, errors.New("federation api key not provided")
	}

	axiomAPIKey := os.Getenv("FAT_BEARS_AXIOM_API_KEY")
	if axiomAPIKey == "" {
		return Config{}, errors.New("axiom api key not provided")
	}

	return Config{
		Environment:      environment,
		Port:             port,
		MongoURL:         mongoURL,
		FederationAPIKey: federationAPIKey,
		AxiomAPIKey:      axiomAPIKey,
	}, nil
}

func main() {
	err := godotenv.Load()
	if err != nil {
		panic(fmt.Errorf("failed to load dotenv: %w", err))
	}

	config, err := loadConfig()
	if err != nil {
		panic(err)
	}

	loggingHook, loggingHookCloser, err := jlogging.NewAxiomLoggingHook(config.AxiomAPIKey, "app-logs")
	if err != nil {
		panic(err)
	}
	defer loggingHookCloser()
	loggingService := jlogging.NewLoggingService("fat_bears", loggingHook)

	federationSDK := sdk.NewSDK(config.FederationAPIKey)
	userMiddleware := middlewares.NewGetUser(nil, federationSDK)
	authMiddleware := middlewares.NewRequireAuth(false)
	adminMiddleware := middlewares.NewRequireAuth(true)

	mongoClient, err := mongo.Connect(options.Client().ApplyURI(config.MongoURL))
	tournamentsMongo, err := jmongo.NewMongo[Tournament](mongoClient, "fat_bears", "tournaments")
	if err != nil {
		panic(fmt.Errorf("failed to start tournaments mongo: %w", err))
	}
	bracketsMongo, err := jmongo.NewMongo[Bracket](mongoClient, "fat_bears", "brackets")
	if err != nil {
		panic(fmt.Errorf("failed to start brackets mongo: %w", err))
	}

	controller := NewController(
		tournamentsMongo,
		bracketsMongo,
		loggingService.NewLogger("fat-bears", "handler/controller"),
		federationSDK,
	)

	mux := http.NewServeMux()

	// TOURNAMENT //
	tournamentWithCodePath := fmt.Sprintf("/api/tournament/{%s}", TournamentCodePathKey)
	jhttp.
		NewEndpointFunction("/api/tournament", controller.CreateTournament).
		WithMethod(http.MethodPost).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(tournamentWithCodePath, controller.GetTournament).
		WithPathKeys(TournamentCodePathKey).
		WithMethod(http.MethodGet).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(tournamentWithCodePath, controller.UpdateTournament).
		WithPathKeys(TournamentCodePathKey).
		WithMethod(http.MethodPut).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(tournamentWithCodePath, controller.DeleteTournament).
		WithPathKeys(TournamentCodePathKey).
		WithMethod(http.MethodDelete).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/user/tournaments", controller.GetTournamentsForUser).
		WithMethod(http.MethodGet).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/get-golden", controller.GetGoldenBracket).
		WithMethod(http.MethodGet).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/admin/update-golden", controller.AdminUpdateGoldenBracket).
		WithMethod(http.MethodPut).
		WithMiddlewares(userMiddleware, adminMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(
			fmt.Sprintf("%s/check-code", tournamentWithCodePath),
			controller.CheckTournamentJoinCode,
		).
		WithPathKeys(TournamentCodePathKey).
		WithMethod(http.MethodGet).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(fmt.Sprintf("%s/join", tournamentWithCodePath), controller.CreateBracket).
		WithPathKeys(TournamentCodePathKey).
		WithMethod(http.MethodPost).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)

	// BRACKETS //
	bracketWithUUIDPath := fmt.Sprintf("/api/bracket/{%s}", BracketUUIDPathKey)
	jhttp.
		NewEndpointFunction(fmt.Sprintf("%s/brackets", tournamentWithCodePath), controller.GetTournamentBrackets).
		WithPathKeys(TournamentCodePathKey).
		WithMethod(http.MethodGet).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/brackets", controller.GetBrackets).
		WithMethod(http.MethodGet).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(bracketWithUUIDPath, controller.UpdateBracket).
		WithPathKeys(BracketUUIDPathKey).
		WithMethod(http.MethodPut).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction(bracketWithUUIDPath, controller.DeleteBracket).
		WithPathKeys(BracketUUIDPathKey).
		WithMethod(http.MethodDelete).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/user/brackets", controller.GetBracketsForUser).
		WithMethod(http.MethodGet).
		WithMiddlewares(userMiddleware, authMiddleware).
		HandleEndpoint(mux)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), mux)
}
