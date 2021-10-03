const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library')
// const key = process.env.REACT_APP_GOOGLE_CLIENT_ID
const key = "181267109282-67mtbok008de2sbpgt9dpotdjkik5usp.apps.googleusercontent.com"
const client = new OAuth2Client(key)

const verifyUser = (req, res, next) => {
    client.verifyIdToken({ idToken: req.body.tokenId, audience: key })
        .then(response => {
            res.status(200).send(response.getPayload());
        }).catch(reason => {
            console.log(reason);
            res.status(403).send(reason);
        })
}

router.post('/', function (req, res) {
    verifyUser(req, res, function ({ email_verified, email, name }) {
        res.status(200).send({ email_verified, email, name });
    });
});

module.exports = router;