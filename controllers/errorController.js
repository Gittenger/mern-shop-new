const AppError = require('../utils/appError')

const sendErrorDev = (err, req, res) => {
	return res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	})
}

module.exports = (err, req, res, next) => {
	// should be set when error created, if not, unknown error (500)
	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, req, res)
	} else if (process.env.NODE_ENV === 'production') {
		// sendErrorProd(err, req, res)
	}
}
