import React, { useState, useEffect } from 'react'
import Carousel from 'react-gallery-carousel'
import { API, PUBLIC } from '../env.js'
import 'react-gallery-carousel/dist/index.css'

const Gallery = () => {
	const [images, setImages] = useState([])

	useEffect(() => {
		fetch(`${API}/images`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(({ images }) => {
				setImages(images.map(el => ({ src: `${PUBLIC}/img/${el.name}` })))
			})
			.catch(err => console.log(err))

		console.log(images)
	}, [])

	return (
		<div>
			<h1>This is the gallery</h1>
			<Carousel images={images} style={{ height: 800, width: 500 }} />
		</div>
	)
}

export default Gallery
