require("dotenv").config()

const express = require("express")
const accountsData = require("./resources/data/accounts.json")

const PORT = process.env.SERVER_PORT || 3000

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.get("/api/accounts", (req, res) => {
    res.json(accountsData)
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})