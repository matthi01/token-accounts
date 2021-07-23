package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type accountOriginal struct {
	FirstName  string `json:"First Name"`
	LastName   string `json:"Last Name"`
	Country    string `json:"Country"`
	Email      string `json:"email"`
	DOB        string `json:"dob"`
	MFA        string `json:"mfa"`
	Amount     int    `json:"amt"`
	ReferredBy string `json:"ReferredBy"`
}

type accountNew struct {
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Country    string `json:"country"`
	Email      string `json:"email"`
	DOB        string `json:"dob"`
	MFA        string `json:"mfa"`
	Amount     int    `json:"amount"`
	ReferredBy string `json:"referredBy"`
}

func main() {
	// open original accounts file
	jsonFile, err := os.Open("./accounts_original.json")
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
		account.ReferredBy = original.ReferredBy
		accounts = append(accounts, account)
	}

	// marshal new account data to json
	accountsJson, err := json.Marshal(accounts)
	if err != nil {
		fmt.Println(err)
	}

	// write to new accounts.json file
	err = ioutil.WriteFile("accounts.json", accountsJson, 0644)
	if err != nil {
		fmt.Println(err)
	}
}
