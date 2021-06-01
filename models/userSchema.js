const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'User must have a name'],
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email address is required'],
		unique: true,
		lowercase: true,
		validate: [
			validator.isEmail,
			'Email address is not valid. Please supply a valid email address',
		],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minLength: 8,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			validator: function (el) {
				return el === this.password
			},
			message: 'Passwords are not the same',
		},
	},
	passwordChangedAt: Date,
})

const User = mongoose.model('User', userSchema)

module.exports = User
