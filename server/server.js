require("dotenv").config()
require("./src/db/mongoose")
const Account = require("./src/models/account")

const express = require("express")

const PORT = process.env.SERVER_PORT || 3000

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.get("/api/accounts", (req, res) => {
    Account.find({})
        .then(users => {
            res.send(users)
        })
        .catch(error => {
            res.status(500).send()
        })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})