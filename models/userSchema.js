const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

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
		select: false,
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
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
})

// DOCUMENT MIDDLEWARE
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) next()

	this.password = await bcrypt.hash(this.password, 12)
	this.passwordConfirm = undefined
	next()
})

// STATIC METHODS
userSchema.methods.correctPassword = async function (rqPassword, dbPassword) {
	return await bcrypt.compare(rqPassword, dbPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
		return JWTTimestamp < changedTimeStamp
	}
	return false
}

const User = mongoose.model('User', userSchema)

module.exports = User
