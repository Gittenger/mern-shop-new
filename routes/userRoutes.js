const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const { signup, login, protect, restrictTo } = authController
const { getOne } = userController

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.use(protect)

router.get('/getUser/:id', restrictTo('admin'), getOne)

module.exports = router
