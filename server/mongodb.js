const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

const accountsData = require("./resources/data/accounts.json")

const connectionUrl = "mongodb://localhost:27017"
const dbName = "ledn_dashboard"

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, async (error, client) => {
    if (error) {
        return console.log("Unable to connect. Error: ", error)
    }

    console.log("connected")

    const db = client.db(dbName)

    await db.collection("accounts").drop()

    db.collection("accounts").insertMany(accountsData, (error, result) => {
        if (error) {
            console.log("Failed to insert documents. Error:", error)
        }
    })
})