require("dotenv").config()
require("./db/mongoose")

const express = require("express")
const accountRouter = require("./routers/accountRouter")

const PORT = process.env.SERVER_PORT || 3000

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(accountRouter)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})