package emails

import _ "embed" // embed is a logicless import that allows us to store our HTML templates in our go code

// VerifyTemplate is the HTML template for email verification
//
//go:embed verify.html
var VerifyTemplate string

// VerificationEmailData is the template data for a
// verification email
type VerificationEmailData struct {
	FirstName       string
	VerificationURL string
	ExpiresStr      string
}
