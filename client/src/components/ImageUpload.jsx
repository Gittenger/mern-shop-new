import React, { useState } from 'react'
import { API } from '../env.js'
import { ImageFormContainer } from './ImageUpload.styles'
import { auth } from '../utils/utils-index.js'

const { checkAuthToken } = auth

const ImageUpload = () => {
	const { token } = checkAuthToken()

	const [selectedFile, setSelectedFile] = useState(null)

	const handleSubmit = e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', selectedFile)

		fetch(`${API}/uploadImage`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		})
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	const handleChange = e => {
		setSelectedFile(e.target.files[0])
	}

	const ImageForm = () => (
		<ImageFormContainer>
			<input type="file" onChange={handleChange} />
			<button onClick={handleSubmit}>Submit</button>
		</ImageFormContainer>
	)

	return (
		<>
			<p>Upload Image</p>
			{ImageForm()}
		</>
	)
}

export default ImageUpload
