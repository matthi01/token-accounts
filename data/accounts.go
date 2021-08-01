package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type accountOriginal struct {
	FirstName  string `json:"First Name"`
	LastName   string `json:"Last Name"`
	Country    string `json:"Country"`
	Email      string `json:"email"`
	DOB        string `json:"dob"`
	MFA        string `json:"mfa"`
	Amount     int    `json:"amt"`
	Created    string `json:"createdDate"`
	ReferredBy string `json:"ReferredBy"`
}

type accountNew struct {
	FirstName  string `bson:"firstName"`
	LastName   string `bson:"lastName"`
	Country    string `bson:"country"`
	Email      string `bson:"email"`
	DOB        string `bson:"dob"`
	MFA        string `bson:"mfa"`
	Amount     int    `bson:"amount"`
	Created    string `bson:"createdDate"`
	ReferredBy string `bson:"referredBy"`
}

func main() {
	loadEnv()

	fmt.Println(os.Getenv("SERVER_PORT"))

	// open original accounts file
	jsonFile, err := os.Open("./accounts.json")
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	// read original file
	byteArr, _ := ioutil.ReadAll(jsonFile)

	var originalAccounts []accountOriginal
	err = json.Unmarshal(byteArr, &originalAccounts)
	if err != nil {
		fmt.Println(err)
	}

	// convert data from original to new struct
	var accounts []accountNew
	for _, original := range originalAccounts {
		var account accountNew
		account.FirstName = original.FirstName
		account.LastName = original.LastName
		account.Country = original.Country
		account.Email = original.Email
		account.DOB = original.DOB
		account.MFA = original.MFA
		if original.MFA == "null" {
			account.MFA = ""
		}
		account.Amount = original.Amount
		account.Created = original.Created
		account.ReferredBy = original.ReferredBy
		accounts = append(accounts, account)
	}

	// set up database connection
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	dbConnectionString := fmt.Sprintf("%s/%s", dbHost, dbName)
	client, err := mongo.NewClient(options.Client().ApplyURI(dbConnectionString))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	lednDashboardDB := client.Database("ledn_dashboard")
	accountsCollection := lednDashboardDB.Collection("accounts")

	// insert documents into the accounts collection
	for _, account := range accounts {
		_, err := accountsCollection.InsertOne(ctx, account)
		if err != nil {
			fmt.Println("Insert Error:", err)
		}
	}
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}
