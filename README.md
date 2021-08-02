# Ledn Token Dashboard

This project contains a display dashboard for a fictional Ledn token. It contains both a REST API server to host the data via a MongoDB database, a Golang script to clean up the provided json file and create and import the data into the database, and the client side react app.

The project challenge document can be found [CodeChallenge.md](here).

## Features:

- Responsiveness down to 375px
- Responsive table design
- Selection export to CSV
- Table filtering
- Table Sorting
- MongoDB database storage
- Supports server side pagination, sorting, and filtering

### Tech:

- React
- Typescript
- Node
- MongoDB
- Go

## Running the project:

### Set up .env files

An .env.example file has been provided for both Client and Server. Create a .env file in the same directory as the .env.example file. Copy the contents of .env.example into .env. Do this for both Client and Server directories.

You can run this project with 2 different approaches:
1. Running the Client and Server independently. For this apprach please check the README files for both the Client and Server and follow their instructions. Disregard the instructions below.
2. Running the app through the parent project (here). Follow the instructions below from the current directory.

### `npm install`

Installs necessary dependencies of the parent project

### `npm run install-dependencies`

Installs necessary dependencies of the Server and the Client.

### Setting up and populating database

Ensure you have a local running instance of mongoDB.

At the root of the project, in the data directory, compile and run the accounts.go script. This script will:

- read the accounts.json file provided
- clean up the json
- create a ledn_dashboard database
- populate an accounts collection within ledn_dashboard

### `npm start`

Runs the server on [http://localhost:3000](http://localhost:3000). 
Runs the client on [http://localhost:8080](http://localhost:8080).
