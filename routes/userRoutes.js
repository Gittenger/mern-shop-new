const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const {
	signup,
	login,
	protect,
	restrictTo,
	logout,
	forgotPassword,
	updatePassword,
	resetPassword,
} = authController
const { getOne, getMe, getAll } = userController

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.use(protect)

router.get('/users/me', getMe, getOne)
router.patch('/updatePassword', updatePassword)

router.get('/users/list', restrictTo('admin'), getAll)
router.get('/users/:id', restrictTo('admin'), getOne)

module.exports = router
