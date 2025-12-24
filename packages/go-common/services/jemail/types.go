package jemail

// SendDetails contains the information about sending the email
type SendDetails struct {
	// To is required, the rest are optional
	To  []EmailRecipient
	CC  []EmailRecipient
	BCC []EmailRecipient
}

// EmailRecipient describes an email recipient
type EmailRecipient struct {
	Email string
	Name  string
}
