const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const userRoutes = require('./routes/userRoutes')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const app = express()

// dev tools
app.use(morgan('dev'))

// request parsing
app.use(
	express.json({
		limit: '10kb',
	})
)
app.use(cookieParser())
app.use(
	express.urlencoded({
		extended: true,
		limit: '10kb',
	})
)

// cors, allow all req from all origins
app.use(cors())
app.options('*', cors())

// security
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())

const limiter = rateLimit({
	max: 500,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP. Try again in one hour.',
})
app.use('/', limiter)

// static files
app.use(express.static(path.join(__dirname, 'public')))

// custom request fields
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString()
	next()
})

// routes
app.use('/', userRoutes)

app.all('*', (req, res, next) => {
	next(
		new AppError(`can't find ${req.originalUrl} route not found on server`, 404)
	)
})

app.use(globalErrorHandler)

module.exports = app
