// const secret = require('../config/keys').secret;
// const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client("181267109282-67mtbok008de2sbpgt9dpotdjkik5usp.apps.googleusercontent.com")

// exports.auth = (req, res, next) => {
//     const token = req.header('x-auth-token');

//     if(!token) res.status(401).json({ msg: 'No token, autherization denied' });
    
//     try {
//         const decoded = jwt.verify(token, secret);
//         req.user = decoded;
//         next();
//     }
//     catch(e) {
//         res.status(400).json({ msg: 'Token is not valid' });
//     }


// }

// module.exports = auth;


const googlesignin = (req, res) => {
    
    const {tokenId} = req.body;
    client.verifyIdToken({idToken: tokenId, audience: "181267109282-67mtbok008de2sbpgt9dpotdjkik5usp.apps.googleusercontent.com"}).then(response => {
        const {email_verified, name, email} = response.getPayload;

        console.log(response.getPayload)
    })
    console.log()
}

module.exports = googlesignin;