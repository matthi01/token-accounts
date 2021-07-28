const mongoose = require("mongoose")

const Account = mongoose.model("Account", {
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

module.exports = Account