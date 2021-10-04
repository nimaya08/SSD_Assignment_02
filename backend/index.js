require('dotenv-defaults').config()
const keys = require('./config/keys')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const server = require('http').Server(app);
const port = process.env.PORT || 5000;

const { google } = require("googleapis")
const path = require("path")

// routes
const test = require('./routes/api/test')
const news = require('./routes/api/news')
const user = require('./routes/api/user')
// const auth = require('./routes/api/auth')
const googlesignin = require('./routes/api/googlesignin')
const friends = require('./routes/api/friends')
const auth = require('./routes/api/auth')

// cors and other middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// mongodb connect
const uri = keys.mongoURI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
    console.log('GameNEWS online...');
});

// routing
app.use('/api/test', test)
app.use('/api/news', news)
app.use('/api/user', user)
// app.use('/api/auth', auth)
app.use('/api/googlesigin', googlesignin)
app.use('/api/friends', friends);

// make interface
server.listen(port, () => {
    console.log('server is listening on port %s', port)
})

const keyFile = path.join(__dirname, "credentials.json")
const scopes = [
  "https://www.googleapis.com/auth/contacts"
]

const run = async () => {
  const { people } = google.people({
    version: "v1",
    auth: await google.auth.getClient({
      keyFile,
      scopes
    })
  })

  const response = await people.connections.list({
    resourceName: "people/me",
    personFields: "names"
  })

  console.log(response)
}

run()

// function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey("YOUR_API_KEY");
//     return gapi.client.load("https://people.googleapis.com/$discovery/rest?version=v1")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.people.people.connections.list({
//       "resourceName": "people/me",
//       "personFields": "addresses"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//   });

//   authenticate().then(loadClient)
//   execute()