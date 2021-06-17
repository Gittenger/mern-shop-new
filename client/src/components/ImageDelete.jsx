import React, { useState, useEffect, useCallback } from 'react'
import { API, PUBLIC } from '../env.js'
import { ImageDeleteContainer } from './ImageDelete.styles'
import { auth } from '../utils/utils-index.js'

const { checkAuthToken } = auth

const ImageDelete = () => {
	const { token } = checkAuthToken()

	const [images, setImages] = useState([])

	const getImages = useCallback(() => {
		fetch(`${API}/images`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(({ images }) => {
				setImages(
					images.map(el => ({
						name: el.name,
						src: `${PUBLIC}/img/${el.name}`,
						id: el._id,
					}))
				)
			})
			.catch(err => console.log(err))

		console.log(images)
	}, [])

	useEffect(getImages, [])

	const handleDelete = e => {
		const { id, name } = e.target
		const data = {
			filename: name,
			id,
		}

		fetch(`${API}/images/delete`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			console.log(res)
			getImages()
		})
	}

	return (
		<ImageDeleteContainer>
			{images.map(({ src, id, name }) => (
				<div key={id}>
					<img src={src} />
					<button onClick={handleDelete} name={name} id={id}>
						Delete
					</button>
				</div>
			))}
		</ImageDeleteContainer>
	)
}

export default ImageDelete
