const express = require('express');
const router = express.Router();

// @route 	GET api/relays
// @desc		Test route
// @access	Public

router.get('/', (req, res) => res.send('Relays route'));

module.exports = router;
