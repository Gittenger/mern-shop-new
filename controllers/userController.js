const User = require('../models/userSchema')
const catchAsync = require('../utils/catchAsync')

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
