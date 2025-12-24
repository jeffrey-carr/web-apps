package jemail

import (
	"bytes"
	htmlTemplate "html/template"
	"io"
	"os"
)

// HTMLTemplateFileToString reads in an HTML template file, replaces the variables, and returns it
// as a string
func HTMLTemplateFileToString[T any](templatePath string, replacements T) (string, error) {
	templateFile, err := os.Open(templatePath)
	if err != nil {
		return "", err
	}
	templateContent, err := io.ReadAll(templateFile)
	if err != nil {
		return "", err
	}
	return HTMLTemplateToString(string(templateContent), replacements)
}

// HTMLTemplateToString replaces the variables in an HTML remplate, and returns it
// as a string
func HTMLTemplateToString[T any](templateContent string, replacements T) (string, error) {
	template, err := htmlTemplate.New("email").Parse(string(templateContent))
	if err != nil {
		return "", err
	}

	var replaced bytes.Buffer
	err = template.Execute(&replaced, replacements)
	if err != nil {
		return "", err
	}

	return replaced.String(), nil
}
