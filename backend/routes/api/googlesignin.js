const express = require('express');
const router = express.Router();

const googlesignin = require("../../middleware/auth")

// router.post('/', googlesignin);

router.post('/', (req,res) => {
    res.send('GameNEWS_news')
})

module.exports = router;