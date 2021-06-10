const express = require('express')
const imageController = require('../controllers/imageController')
const authController = require('../controllers/authController')

const router = express.Router()

const { protect } = authController
const { uploadImage, updateImageDB } = imageController

router.use(protect)

router.post('/uploadImage', uploadImage, updateImageDB)

module.exports = router
