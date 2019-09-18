const express = require('express');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../models/User');

// @route 	GET api/auth
// @desc		Validate token to authenticate access
// @access	Private

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).json(user);
	} catch (err) {
		console.error(err.message);
		res.status(401).json({ errors: [{ msg: 'Invalid user' }] });
	}
});

// @route 	POST api/auth
// @desc		Authenticate user and get token
// @access	Private

router.post(
	'/',
	auth,
	[
		check('email', 'Please include valid e-mail').isEmail(),
		check('password', 'Password required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Extract data sent through body of request
		const { email, password } = req.body;

		try {
			// Check if email exists
			let user = await User.findOne({ email });
			let pwdMatch = null;

			if (user) {
				pwdMatch = await bcrypt.compare(password, user.password);
			}

			if (!user || !pwdMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid credentials' }] });
			}

			jwt.sign(
				{ user: { id: user.id } },
				keys.jwtSecret,
				{ expiresIn: '365 days' },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
