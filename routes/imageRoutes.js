const express = require('express')
const imageController = require('../controllers/imageController')
const authController = require('../controllers/authController')

const router = express.Router()

const { protect } = authController
const { uploadImage, updateImageDB, getImages } = imageController

router.get('/', getImages)

router.use(protect)

router.post('/upload', uploadImage, updateImageDB)

module.exports = router
