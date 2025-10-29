package calendar

import (
	calendarTypes "calendar-backend/calendar/types"
)

func applyCalendarUpdate(req calendarTypes.UpdateCalendarRequest, calendar calendarTypes.Calendar) calendarTypes.Calendar {
	if req.Name != nil {
		calendar.Name = *req.Name
	}
	if req.Months != nil {
		calendar.Months = req.Months
	}

	return calendar
}
