const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const htmlToText = require('html-to-text')
const pug = require('pug')

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email
		this.name = user.name
		this.url = url
		this.from = process.env.EMAIL_FROM || 'defaultAdmin@test.com'
	}

	newTransport() {
		if (process.env.NODE_ENV == 'production') {
			// use sendgrid
			return nodemailer.createTransport(
				nodemailerSendgrid({ apiKey: process.env.SENDGRID_API_KEY })
			)
		} else {
			return nodemailer.createTransport({
				host: process.env.EMAIL_HOST,
				port: process.env.EMAIL_PORT,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD,
				},
			})
		}
	}

	async send(template, subject) {
		const html = pug.renderFile(`${__dirname}/../mailTemplates/${template}.pug`, {
			url: this.url,
			name: this.name,
			subject,
		})

		const mailOptions = {
			from: this.from,
			to: this.to,
			// other options and local vars here
			subject,
			html,
			text: htmlToText.htmlToText(html),
		}

		await this.newTransport().sendMail(mailOptions)
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to our site!')
	}

	async sendPasswordReset() {
		await this.send(
			'resetPassword',
			'Your password reset token (expires in 10 minutes)'
		)
	}
}
