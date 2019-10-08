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

// @route 	PUT api/patients/patient_id
// @desc		Edit patient Information
// @access	Private

router.put(
	'/:_id',
	auth,
	[
		check('status', 'Status is required').isString(),
		check('firstname', 'First name required').not().isEmpty(),
		check('lastname', 'Last name required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { status, firstname, lastname, observation } = req.body;

			const user = await User.findById(req.user.id);

			const patient = {
				status,
				firstname,
				lastname,
				observation
			};

			const editIndex = user.devices.findIndex(
				(device) => String(device._id) === String(req.params._id)
			);

			user.devices.splice(editIndex, 1, { patient });

			await user.save();

			res.status(200).json(user.devices[editIndex]);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
		}
	}
);

// @route 	GET api/patients/patient_id
// @desc		Get all patient information
// @access	Private

router.get('/:_id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const patient = user.devices.find(
			(device) => String(device._id) === String(req.params._id)
		);

		res.status(200).json(patient);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
	}
});

// @route 	DELETE api/patients/patient_id
// @desc		Delete all patient information
// @access	Private

router.delete('/:_id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const removeIndex = user.devices.findIndex(
			(device) => String(device._id) === String(req.params._id)
		);

		user.devices.splice(removeIndex, 1);

		await user.save();

		res.status(200).json(user.devices);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
	}
});

module.exports = router;
