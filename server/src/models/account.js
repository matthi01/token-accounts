const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String
    },
    dob: {
        type: Date
    },
    mfa: {
        type: String,
        required: false
    },
    amount: {
        type: Number
    },
    referredBy: {
        type: String,
        required: false
    }
})

const Account = mongoose.model("Account", accountSchema)

module.exports = Account