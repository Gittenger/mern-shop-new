const express = require('express')
const authController = require('../controllers/authController')

const { signup, login, protect } = authController

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.use(protect)

module.exports = router
