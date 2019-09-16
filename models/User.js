const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	institution: {
		type: String,
		required: true
	},
	jobtitle: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

// mongoose.model('users', userSchema, 'users);
module.exports = User = mongoose.model('users', userSchema);
