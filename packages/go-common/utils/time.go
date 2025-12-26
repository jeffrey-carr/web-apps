package utils

import "time"

// ToEST converts a time to EST
func ToEST(t time.Time) (time.Time, error) {
	loc, err := time.LoadLocation("America/New_York")
	if err != nil {
		return t, err
	}

	return t.In(loc), nil
}
