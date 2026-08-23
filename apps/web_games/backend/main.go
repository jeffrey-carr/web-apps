package main

import (
	"encoding/json"
	"errors"
	"federation/sdk"
	"fmt"
	"go-common/constants"
	"go-common/jhttp"
	"go-common/jhttp/middlewares"
	"go-common/services/jencryption"
	"go-common/services/jmongo"
	"go-common/utils"
	"jeffs-web-games/binoku"
	binokuDomain "jeffs-web-games/domains/binoku"
	userDomain "jeffs-web-games/domains/user"
	wordChainDomain "jeffs-web-games/domains/word_chain"
	"jeffs-web-games/stats"
	"jeffs-web-games/types"
	"jeffs-web-games/user"
	"jeffs-web-games/word_chain"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func loadConfig() types.Config {
	loadEnv := func(key string, required bool) (string, error) {
		value := os.Getenv(key)
		if value == "" && required {
			return "", fmt.Errorf("missing required environment variable: %s", key)
		}

		return value, nil
	}

	loadEnvWithFallback := func(key, fallback string) string {
		v, _ := loadEnv(key, false)
		if v != "" {
			return v
		}

		return fallback
	}

	mongoConnectionURL, err := loadEnv("MONGO_CONNECTION_URL", true)
	if err != nil {
		panic(err)
	}

	federationAPIKey, err := loadEnv("FEDERATION_API_KEY", true)
	if err != nil {
		panic(err)
	}

	return types.Config{
		Environment:             loadEnvWithFallback("ENVIRONMENT", constants.EnvDev),
		Port:                    loadEnvWithFallback("PORT", "8080"),
		MongoConnectionURL:      mongoConnectionURL,
		WordChainEncryptionFile: loadEnvWithFallback("WORD_CHAIN_ENCRYPTION_FILE", "word_chain_secret.txt"),
		FederationAPIKey:        federationAPIKey,
	}
}

func loadDictionary(path string) (map[string][]string, error) {
	fmt.Printf("Loading dictionary (%s)...", path)
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var ret map[string][]string
	err = json.Unmarshal(data, &ret)
	if err != nil {
		return nil, err
	}

	fmt.Printf("Dictionary loaded with %d entries\n", len(ret))
	return ret, nil
}

func testDictionay(dict map[string][]string) error {
	fmt.Println("Validating dictionary...")
	// Make sure every word that can be selected has a list of words
	invalidWords := utils.NewSet[string]()
	for _, chain := range dict {
		for _, word := range chain {
			if _, ok := dict[word]; !ok {
				invalidWords.Add(word)
			}
		}
	}

	if invalidWords.Size() > 0 {
		errStr := fmt.Sprintf("%d invalid words!", invalidWords.Size())
		for invalidWord := range invalidWords.Iter {
			errStr = fmt.Sprintf("%s\n\t%s", errStr, invalidWord)
		}

		f, err := os.Create("invalid_words.txt")
		if err != nil {
			return err
		}
		defer f.Close()

		_, err = f.WriteString(errStr)
		if err != nil {
			return err
		}

		fmt.Println("Dictionary is not valid! Invalid list written to invalid_words.txt")
		return errors.New("dictionary is not valid")
	}
	fmt.Println("Dictionary is valid!")
	return nil
}

func main() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	config := loadConfig()

	wordChainDictionary, err := loadDictionary("word_chain/dictionary.json")
	if err != nil {
		panic(err)
	}
	err = testDictionay(wordChainDictionary)
	if err != nil {
		panic(err)
	}

	// SERVICES //
	mongoClient, err := mongo.Connect(options.Client().ApplyURI(config.MongoConnectionURL))
	if err != nil {
		panic(err)
	}
	federationSDK := sdk.NewSDK(config.FederationAPIKey)
	encryptionService, err := jencryption.NewEncryptionService(config.WordChainEncryptionFile)
	if err != nil {
		panic(err)
	}

	// MIDDLEWARES
	userMiddleware := middlewares.NewGetUser(nil, federationSDK)
	authMiddleware := middlewares.NewRequireAuth(false)

	// REPOSITORIES
	statsRepo, err := jmongo.NewMongo[stats.UserStats](mongoClient, "web_games", "user_stats")
	if err != nil {
		panic(err)
	}

	// CONTROLLERS //
	binokuController := binoku.NewController()
	wordChainController := word_chain.NewController(wordChainDictionary, encryptionService)
	statsController := stats.NewController(statsRepo)
	userController := user.NewController(statsController)

	// HANDLERS //
	binokuHandler := binokuDomain.NewHandler(binokuController, statsController)
	wordChainHandler := wordChainDomain.NewHandler(wordChainController, statsController)
	userHandler := userDomain.NewHandler(userController)

	// ROUTER //
	defaultBuilder := jhttp.NewEndpointBuilder(
		func() middlewares.Middleware {
			return userMiddleware
		},
	)
	mux := http.NewServeMux()

	// ENDPOINTS //
	// Binoku
	jhttp.
		NewEndpointFunction("/api/binoku/new-game", binokuHandler.NewGame).
		WithMethod(http.MethodGet).
		WithBuilders(defaultBuilder).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/binoku/validate-board", binokuHandler.ValidateBoard).
		WithMethod(http.MethodPost).
		WithBuilders(defaultBuilder).
		HandleEndpoint(mux)

	// Word Chain
	jhttp.
		NewEndpointFunction("/api/word-chain/new-game", wordChainHandler.NewGame).
		WithMethod(http.MethodGet).
		WithBuilders(defaultBuilder).
		HandleEndpoint(mux)
	jhttp.
		NewEndpointFunction("/api/word-chain/validate-guess", wordChainHandler.ValidateGuess).
		WithMethod(http.MethodPost).
		WithBuilders(defaultBuilder).
		HandleEndpoint(mux)

	// User
	jhttp.
		NewEndpointFunction("/api/user/me", userHandler.GetMe).
		WithMethod(http.MethodGet).
		WithBuilders(defaultBuilder).
		WithMiddlewares(authMiddleware).
		HandleEndpoint(mux)

	fmt.Printf("Starting server on port %s\n", config.Port)
	http.ListenAndServe(fmt.Sprintf(":%s", config.Port), mux)
}
