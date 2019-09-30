const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../models/User');

// @route 	POST api/patients
// @desc		Patient admission
// @access	Private

router.post(
	'/',
	auth,
	[
		check('firstname', 'First name required').not().isEmpty(),
		check('lastname', 'Last name required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { firstname, lastname, observation } = req.body;

			const patient = {
				firstname,
				lastname,
				observation
			};

			const user = await User.findById(req.user.id);

			const count = user.devices.push({ patient });

			await user.save();

			res.status(200).json(user.devices[count - 1]);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
		}
	}
);

module.exports = router;
