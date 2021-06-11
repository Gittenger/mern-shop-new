const multer = require('multer')
const Image = require('../models/imageSchema')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const multerStorage = multer.diskStorage({
	// first param of cb's is error
	destination: (req, file, cb) => {
		cb(null, `${__dirname}/../public/img`)
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1]
		cb(null, `${req.user.id}-${Date.now()}.${ext}`)
	},
})

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true)
	} else {
		cb(new AppError('Uploaded file must be an image.', 400), false)
	}
}

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
})

// takes as parameter incoming field from form data
exports.uploadImage = upload.single('image')

// req.file.filename will come from multer
exports.updateImageDB = catchAsync(async (req, res, next) => {
	const img = await Image.create({ name: `${req.file.filename}` })

	res.status(200).json({
		status: 'success',
		img,
	})
})