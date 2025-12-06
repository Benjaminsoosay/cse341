const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the CSE341 API');
});

module.exports = router;