const User = require('../models/userSchema')
const catchAsync = require('../utils/catchAsync')

const filteredObj = (obj, ...allowedFields) => {
	const newObj = {}
	Object.keys(obj).forEach(key => {
		if (allowedFields.includes(key)) newObj[key] = obj[key]
	})

	return newObj
}

exports.getAll = catchAsync(async (req, res, next) => {
	let query = User.find()

	if (req.query.sort) {
		query = query.sort(req.query.sort.split(',').join(' '))
	} else {
		query = query.sort('name')
	}

	const user = await query

	res.status(200).json({
		status: 'success',
		user,
	})
})

exports.getOne = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id)

	if (!user) {
		return res.status(404).json({
			status: 'not found',
			message: 'No user found with that ID',
		})
	}

	res.status(200).json({
		status: 'success',
		requestedAt: req.requestTime,
		user,
	})
})

exports.getMe = (req, res, next) => {
	req.params.id = req.user.id
	next()
}

exports.updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm) {
		return res.status(400).json({
			status: 'bad request',
			message:
				'This route is not for changing password. Please use /updatePassword',
		})
	}

	const filteredBody = filteredObj(req.body, 'name', 'email')
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	})

	res.status(200).json({
		status: 'success',
		data: updatedUser,
	})
})

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false })

	res.status(204).json({
		status: 'success',
		data: null,
	})
})
