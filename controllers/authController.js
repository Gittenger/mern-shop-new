const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
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

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	if (!email | !password) {
		return res.status(400).json({
			status: 'failed',
			message: 'Email and password required',
		})
	}

	const user = await User.findOne({ email }).select('+password')

	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(401).json({
			status: 'failed',
			message: 'Incorrect email or password',
		})
	}

	createAndSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt
	}

	if (!token) {
		return res.status(401).json({
			status: 'failed',
			message: 'You are not logged in. Please log in for access',
		})
	}

	// decoded jwt returns payload obj which contains id
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

	const currentUser = await User.findById(decoded.id)
	if (!currentUser) {
		return res.status(401).json({
			status: 'failed',
			message: 'The user belonging to this token no longer exists',
		})
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return res.status(401).json({
			status: 'failed',
			message: 'This user recently changed their password. Please log in again.',
		})
	}

	// grant access
	req.user = currentUser
	// grant usage to views
	req.locals.user = currentUser
	next()
})

exports.logout = (req, res, next) => {
	res.cookie('jwt', 'logged_out', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	})
	res.status(200).json({
		status: 'success',
	})
}

exports.restrictTo =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				status: 'forbidden',
				message: 'You do not have permission to perform this action',
			})
		}
	}