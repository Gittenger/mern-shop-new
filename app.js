const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString()
	next()
})
app.use(cors())

module.exports = app
