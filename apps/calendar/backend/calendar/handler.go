package calendar

import (
	types "calendar-backend/calendar/types"
	"context"
	"errors"
	"fmt"
	"go-common/jcontext"
	"go-common/jhttp"
	JHTTPErrors "go-common/jhttp/errors"
	"go-common/utils"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
)

type Handler struct {
	Repo Repository
}

// GetCalendarsAndUser gets all a user's calendar and the user entity itself.
// Since the frontend requires the user info at the same time it wants to get all the calendars, we might as well provide all the info in fewer
// calls.
func (h *Handler) GetCalendarsAndUser(ctx context.Context, r jhttp.RequestData[struct{}]) (types.GetAllCalendarsResponse, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return types.GetAllCalendarsResponse{}, JHTTPErrors.NewUnauthorizedError()
	}

	calendars, err := h.Repo.GetAllUserCalendars(ctx, user.UUID)
	if err != nil && err != mongo.ErrNoDocuments {
		fmt.Printf("Error getting calendars: %s\n", err.Error())
		return types.GetAllCalendarsResponse{}, nil
	}

	// Index by UUID
	calendarsByUUID := make(map[string]types.Calendar, len(calendars))
	for _, calendar := range calendars {
		calendarsByUUID[calendar.UUID] = calendar
	}

	return types.GetAllCalendarsResponse{
		User:      user,
		Calendars: calendarsByUUID,
	}, nil
}

func (h *Handler) CreateCalendar(ctx context.Context, r jhttp.RequestData[types.CreateCalendarRequest]) (types.Calendar, *JHTTPErrors.JHTTPError) {
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return types.Calendar{}, JHTTPErrors.NewUnauthorizedError()
	}

	// Validate the create request
	createRequest := r.Body
	if strings.TrimSpace(createRequest.Name) == "" {
		return types.Calendar{}, JHTTPErrors.NewValidationError(
			map[string]string{"name": "Name is required"},
		)
	}

	// Convert create request to full entity
	emptyMonths := utils.Fill[map[int]types.DayData](12)

	cal := types.Calendar{
		UUID:     utils.NewUUID(),
		UserUUID: user.UUID,
		Name:     createRequest.Name,
		Months:   emptyMonths,
		// TODO - Add this into the request
		Year:      2026,
		CreatedAt: time.Now().Unix(),
	}

	err := h.Repo.CreateCalendar(ctx, cal)
	if err != nil {
		return types.Calendar{}, JHTTPErrors.NewInternalServerError(errors.New("error inserting user"))
	}

	return cal, nil
}

func (h *Handler) UpdateCalendar(ctx context.Context, r jhttp.RequestData[types.UpdateCalendarRequest]) (types.Calendar, *JHTTPErrors.JHTTPError) {
	fmt.Printf("%+v\n", r.PathValues)
	// TODO - validate and sanitize
	if r.Body == nil {
		return types.Calendar{}, JHTTPErrors.NewBadRequestError("No update provided")
	}
	calendarUUID, ok := r.PathValues[CalendarUUIDKey]
	if !ok || calendarUUID == "" {
		return types.Calendar{}, JHTTPErrors.NewBadRequestError("Calendar UUID is required")
	}
	user, ok := jcontext.GetUser(ctx)
	if !ok {
		return types.Calendar{}, JHTTPErrors.NewUnauthorizedError()
	}

	fmt.Printf("Updating calendar %s: %+v\n", calendarUUID, *r.Body)

	fmt.Println("Getting calendar...")
	calendar, err := h.Repo.MongoClient.GetByUUID(ctx, calendarUUID)
	if err != nil {
		fmt.Printf("Error getting calendar: %s\n", err.Error())
		return types.Calendar{}, JHTTPErrors.NewInternalServerError(err)
	}
	fmt.Println("Got calendar")

	if calendar.UserUUID != user.UUID {
		fmt.Println("Calendar does not belong to user")
		return types.Calendar{}, JHTTPErrors.NewUnauthorizedError()
	}

	fmt.Println("Updating calendar...")
	updatedCalendar := applyCalendarUpdate(*r.Body, calendar)
	err = h.Repo.UpdateCalendar(ctx, updatedCalendar)
	if err != nil {
		fmt.Printf("Error saving calendar: %s\n", err.Error())
		return types.Calendar{}, JHTTPErrors.NewInternalServerError(err)
	}
	fmt.Println("Done")

	return updatedCalendar, nil
}
