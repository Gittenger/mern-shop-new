const express = require('express')
const authController = require('../controllers/authController')

const { signup, login } = authController

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

module.exports = router
