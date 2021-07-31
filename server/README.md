# Ledn Token Dashboard Server

NodeJS REST API to serve up accounts data for the Ledn accounts dashboard.

## Features:

- MongoDB database storage
- Supports server side pagination, sorting, and filtering

### Tech:

- NodeJS
- MongoDB
- Go v1.16

## Running the project:

### Set up .env file

An .env.example file has been provided. Create a .env file in the same directory as the .env.example file. Copy the contents of .env.example into .env.

### Setting up and populating database

Ensure you have a local running instance of mongoDB.

At the root of the project, in the data directory, compile and run the accounts.go script. This script will:

- read the accounts.json file provided
- clean up the json
- create a ledn_dashboard database
- populate an accounts collection within ledn_dashboard

### `npm install`

Installs necessary dependencies of the project.

### `npm start`

Runs the server on default port 3000.
