const express = require('express');
const router = express.Router();

// get route
router.get('/user', (rq, res) => { res.send('here') })


module.exports = router;