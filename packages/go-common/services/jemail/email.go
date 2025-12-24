package jemail

import (
	"context"
	"errors"
	"go-common/utils"

	"github.com/oracle/oci-go-sdk/v65/common"
	"github.com/oracle/oci-go-sdk/v65/emaildataplane"
)

// Email manages sending emails
type Email interface {
	SendSimpleEmail(SendDetails, string, string) error
	SendHTMLEmail(SendDetails, string, string) error
}

type email struct {
	client emaildataplane.EmailDPClient
	sender *emaildataplane.Sender
}

// NewEmail creates a new email service
func NewEmail(
	config common.ConfigurationProvider,
	senderEmail string,
	senderName string,
	compartmentID string,
) (Email, error) {
	client, err := emaildataplane.NewEmailDPClientWithConfigurationProvider(config)
	if err != nil {
		return nil, err
	}

	return &email{
		client: client,
		sender: &emaildataplane.Sender{
			CompartmentId: common.String(compartmentID),
			SenderAddress: &emaildataplane.EmailAddress{
				Email: common.String(senderEmail),
				Name:  common.String(senderName),
			},
		},
	}, nil
}

func (e *email) SendSimpleEmail(
	sendDetails SendDetails,
	subject, text string,
) error {
	if len(sendDetails.To) == 0 {
		return errors.New("at least one to address is required")
	}

	req := emaildataplane.SubmitEmailRequest{
		SubmitEmailDetails: emaildataplane.SubmitEmailDetails{
			Sender:     e.sender,
			Recipients: e.customRecipientToOracleRecipient(sendDetails),
			Subject:    common.String(subject),
			BodyText:   common.String(text),
		},
	}

	_, err := e.client.SubmitEmail(context.Background(), req)
	return err
}

func (e *email) SendHTMLEmail(
	sendDetails SendDetails,
	subject, html string,
) error {
	if len(sendDetails.To) == 0 {
		return errors.New("at least one to address is required")
	}

	req := emaildataplane.SubmitEmailRequest{
		SubmitEmailDetails: emaildataplane.SubmitEmailDetails{
			Sender:     e.sender,
			Recipients: e.customRecipientToOracleRecipient(sendDetails),
			Subject:    common.String(subject),
			BodyHtml:   common.String(html),
		},
	}

	_, err := e.client.SubmitEmail(context.Background(), req)
	return err
}

func (e *email) customRecipientToOracleRecipient(allRecipients SendDetails) *emaildataplane.Recipients {
	translator := func(recipient EmailRecipient) emaildataplane.EmailAddress {
		return emaildataplane.EmailAddress{
			Email: common.String(recipient.Email),
			Name:  common.String(recipient.Name),
		}
	}

	return &emaildataplane.Recipients{
		To:  utils.Map(allRecipients.To, translator),
		Cc:  utils.Map(allRecipients.CC, translator),
		Bcc: utils.Map(allRecipients.BCC, translator),
	}
}
