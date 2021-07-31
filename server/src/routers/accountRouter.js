const express = require("express")
const Account = require("../models/account")

const router = new express.Router()

// valid query string examples:
// GET /api/accounts?limit=10
// GET /api/accounts?skip=10
// GET /api/accounts?sort=firstName:asc
// GET /api/accounts?sort=firstName:desc
// GET /api/accounts?filter=nova
router.get("/api/accounts", (req, res) => {
    const limit = parseInt(req.query.limit)
    const skip = parseInt(req.query.skip)
    let sort = {}
    let query = {}
    
    if (req.query.sort) {
        const arrSort = req.query.sort.split(":")
        sort[arrSort[0]] = arrSort[1] === "desc" ? "desc" : "asc"
    }

    if (req.query.filter) {
        const regex = new RegExp(req.query.filter, "i")
        query = {
            $and: [
                { $or: [
                    { firstName: regex }, 
                    { lastName: regex },
                    { country: regex },
                    { email: regex },
                    // { dob: regex },
                    { mfa: regex },
                    // { amount: regex },
                    { referredBy: regex }
                ]}
            ]
        }
    }

    Account.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
            .then(users => {
                res.send(users)
            })
            .catch(error => {
                res.status(500).send(error)
            })
})

module.exports = router