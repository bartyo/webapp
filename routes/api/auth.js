const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

const User = require('../../models/User');

// @route 	GET api/auth
// @desc		Validate token to authenticate access
// @access	Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).json(user);
	} catch (err) {
		console.error(err.message);
		res.status(401).json({ errors: [{ msg: 'Invalid user' }] });
	}
});

module.exports = router;
