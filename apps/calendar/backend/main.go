package main

import (
	"calendar-backend/calendar"
	"calendar-backend/calendar/types"
	"encoding/json"
	"fmt"
	"go-common/jhttp"
	"go-common/jhttp/middlewares"
	"go-common/services"
	"go-common/utils"
	"io"
	"net/http"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Config struct {
	Environment       string `json:"enviroment"`
	MongoURL          string `json:"mongo_connection_url"`
	Port              string `json:"port"`
	OCITenancyOCID    string `json:"oci_tenancy_ocid"`
	OCIUserOCID       string `json:"oci_user_ocid"`
	OCIRegion         string `json:"oci_region"`
	OCIFingerprint    string `json:"oci_fingerprint"`
	OCIPrivateKeyPath string `json:"oci_private_key_path"`
}

func runScript() {}

func main() {
	if os.Getenv("IS_SCRIPT") == "true" {
		runScript()
		os.Exit(0)
		return
	}

	config, err := utils.OpenAndReadJSON[Config](".env")
	if err != nil {
		panic(fmt.Errorf("could not load config", err))
	}

	fmt.Printf("Loaded config: %+v\n", config)

	// Create middlewares
	userMiddleWare := middlewares.GetUser{Environment: config.Environment}
	authMiddleware := middlewares.RequireAuth{Environment: config.Environment}

	mongoClient, err := mongo.Connect(options.Client().ApplyURI(config.MongoURL))
	if err != nil {
		panic(err.Error())
	}

	oracleStorageService, err := services.NewOracle(
		config.OCITenancyOCID,
		config.OCIUserOCID,
		config.OCIRegion,
		config.OCIFingerprint,
		config.OCIPrivateKeyPath,
		nil,
	)
	if err != nil {
		panic(err.Error())
	}

	calendarCollection, err := services.NewMongo[types.Calendar](mongoClient, "calendar", "user_calendars")
	if err != nil {
		panic(err.Error())
	}

	repo := calendar.Repository{MongoClient: calendarCollection}
	handler := calendar.Handler{Repo: repo}

	http.NewServeMux()
	http.HandleFunc(
		"GET /api/my-calendars",
		jhttp.NewEndpoint(
			handler.GetCalendarsAndUser,
			nil,
			userMiddleWare,
			authMiddleware,
		),
	)
	http.HandleFunc(
		"POST /api/calendars",
		jhttp.NewEndpoint(
			handler.CreateCalendar,
			nil,
			userMiddleWare,
			authMiddleware,
		),
	)
	http.HandleFunc(
		fmt.Sprintf("PUT /api/calendars/{%s}", calendar.CalendarUUIDKey),
		jhttp.NewEndpoint(
			handler.UpdateCalendar,
			[]string{calendar.CalendarUUIDKey},
			userMiddleWare,
			authMiddleware,
		),
	)

	fmt.Printf("Starting server on http://calendar.jeffreycarr.local:%s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), nil)
}
