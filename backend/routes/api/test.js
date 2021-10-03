const express = require('express');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/', (req,res) => {
    res.send('GameNEWS')
})

module.exports = router;