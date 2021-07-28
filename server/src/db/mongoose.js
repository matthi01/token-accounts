const mongoose = require("mongoose")

const connectionUrl = "mongodb://localhost:27017"
const dbName = "ledn_dashboard"

mongoose.connect(`${connectionUrl}/${dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})