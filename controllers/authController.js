const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')

const signToken = id =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		// env var is string, | 0 converts to int, thus seconds not ms -- 60 days
		expiresIn: process.env.JWT_EXPIRES_IN | 0,
	})

const createAndSendToken = (user, statusCode, res) => {
	const token = signToken(user._id)
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000),
		httpOnly: true,
	}

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
	res.cookie('jwt', token, cookieOptions)

	user.password = undefined

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	})
}

exports.signup = catchAsync(async (req, res, next) => {
	const { name, email, password, passwordConfirm } = req.body

	const user = await User.create({
		name,
		email,
		password,
		passwordConfirm,
	})

	createAndSendToken(user, 201, res)
})

exports.login = ''
