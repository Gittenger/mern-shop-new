const express = require('express')
const authController = require('../controllers/authController')

const { signup, login, protect, restrictTo } = authController

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.use(protect)

router.get('/restrictedRoute', restrictTo('admin'))

module.exports = router
