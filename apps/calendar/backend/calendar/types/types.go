package types

import "go-common/types"

// Calendar holds the information about a year's calendar
type Calendar struct {
	UUID     string `json:"uuid" bson:"_id"`
	UserUUID string `json:"userUUID" bson:"userUUID"`
	Name     string `json:"name" bson:"name"`
	// Months is a map of month name ("February") --> data
	Months []map[int]DayData `json:"months" bson:"months"`
	// Year is the year of the calendar
	Year       int   `json:"year" bson:"year"`
	ModifiedAt int64 `json:"modifiedAt" bson:"modifiedAt"`
	CreatedAt  int64 `json:"createdAt" bson:"createdAt"`
}

type DayData struct {
	Events   []string `json:"events" bson:"events"`
	ImageURL string   `json:"imageURL" bson:"imageURL"`
}

// GetAllCalendarsResponse is what is returned when request all a user's calendars
type GetAllCalendarsResponse struct {
	User types.CommonUser `json:"user"`
	// Calendars is a map of CalendarUUID --> Calendar
	Calendars map[string]Calendar `json:"calendars"`
}

type CreateCalendarRequest struct {
	Name string `json:"name" validate:"required"`
}

type UpdateCalendarRequest struct {
	Name   *string           `json:"name"`
	Months []map[int]DayData `json:"months"`
}

type ImageMetadata struct {
	Name string `json:"name" bson:"name"`
	MIME string `json:"mime" bson:"mime"`
}
