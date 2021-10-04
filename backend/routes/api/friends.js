const express = require('express');
const router = express.Router();
const path = require("path")
const {google} = require('googleapis');

const fs = require('fs');
const readline = require('readline');

// const keyFile = path.join(__dirname, "credentials.json")
// const scopes = [
// "https://www.googleapis.com/auth/contacts"
// ]

const users = [
    {
        id: 1,
        name: "kasun"
    },
    {
        id: 2,
        name: "Tom"
    }
]

router.get('/allfriends', (req,res) => {
    res.send(users)

    // const run = async () => {
    //     const { people } = google.people({
    //         version: "v1",
    //         auth: await google.auth.getClient({
    //         keyFile,
    //         scopes
    //         })
    //     })
    //     const response = await people.connections.list({
    //         resourceName: "people/me",
    //         personFields: "names"
    //     })
    //     res.send(response)
    // }

    // run()
    
});

module.exports = router;