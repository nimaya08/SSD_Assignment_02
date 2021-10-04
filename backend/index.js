require('dotenv-defaults').config()
const keys = require('./config/keys')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const server = require('http').Server(app);
const port = process.env.PORT || 5000;

// routes
const test = require('./routes/api/test')
const news = require('./routes/api/news')
const user = require('./routes/api/user')
// const auth = require('./routes/api/auth')
const googlesignin = require('./routes/api/googlesignin')
const friends = require('./routes/api/friends')

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
app.use('/api/googlesignin', googlesignin)
app.use('/api/friends', friends);

// make interface
server.listen(port, () => {
    console.log('server is listening on port %s', port)
})