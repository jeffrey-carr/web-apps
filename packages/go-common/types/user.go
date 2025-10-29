package types

type CommonUser struct {
	UUID      string `json:"uuid"`
	Email     string `json:"email"`
	FName     string `json:"fName"`
	LName     string `json:"lName"`
	Character string `json:"character"`
}
