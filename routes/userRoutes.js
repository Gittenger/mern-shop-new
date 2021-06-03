const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const { signup, login, protect, restrictTo, logout } = authController
const { getOne, getMe } = userController

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.use(protect)

router.get('/getMe', getMe, getOne)

router.get('/getUser/:id', restrictTo('admin'), getOne)

module.exports = router
