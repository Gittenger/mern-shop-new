const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString()
	next()
})
app.use(cors())
app.use(cookieParser())

app.use('/', userRoutes)

module.exports = app
