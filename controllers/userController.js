const User = require('../models/userSchema')
const catchAsync = require('../utils/catchAsync')

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
