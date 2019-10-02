const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route 	POST api/users
// @desc		Register user
// @access	Public

router.post(
	'/',
	[
		check('firstname', 'Name is required').not().isEmpty(),
		check('lastname', 'Surname is required').not().isEmpty(),
		check('institution', 'Institution is required').not().isEmpty(),
		check('jobtitle', 'Job title is required').not().isEmpty(),
		check('email', 'Please include valid e-mail').isEmail(),
		check('password', 'Password: 5+ charcters').isLength({ min: 5 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Extract data sent through body of request
		const {
			firstname,
			lastname,
			institution,
			jobtitle,
			email,
			password
		} = req.body;

		try {
			// Check if email exists
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [ { msg: 'User already exists' } ] });
			}

			// Start creation of new user
			user = new User({
				firstname,
				lastname,
				institution,
				jobtitle,
				email,
				password
			});

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// Save user to DB
			await user.save();

			// Generate JWT
			// const payload = {
			// 	user: { id: user.id }
			// };
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

// @route 	PUT api/users
// @desc		Update user
// @access	Public

router.put(
	'/',
	auth,
	[
		check('firstname', 'Name is required').not().isEmpty(),
		check('lastname', 'Surname is required').not().isEmpty(),
		check('institution', 'Institution is required').not().isEmpty(),
		check('jobtitle', 'Job title is required').not().isEmpty(),
		check('email', 'Please include valid e-mail').isEmail(),
		check('password', 'Password Required').isLength({ min: 5 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Extract data sent through body of request
		const {
			firstname,
			lastname,
			institution,
			jobtitle,
			email,
			password
		} = req.body;

		// Start creation of new user
		const update = {
			firstname,
			lastname,
			institution,
			jobtitle,
			email,
			password
		};

		try {
			// Validate User and Permission
			// Check if email exists
			let validate = await User.findOne({ email });
			let pwdMatch = null;

			if (validate) {
				pwdMatch = await bcrypt.compare(password, validate.password);
			}

			if (!validate || !pwdMatch) {
				return res
					.status(400)
					.json({ errors: [ { msg: 'Invalid credentials' } ] });
			}

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			update.password = await bcrypt.hash(password, salt);

			// Save user to DB
			let user = await User.findOneAndUpdate({ email }, update, { new: true });

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
