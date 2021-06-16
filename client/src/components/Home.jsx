import React from 'react'
import { NavLink } from './Home.styles'

const Home = () => (
	<>
		<h1 style={{ marginBottom: '3rem' }}>Home Page</h1>
		<NavLink to="/login">Login</NavLink>
		<NavLink to="/gallery">Gallery</NavLink>
	</>
)

export default Home
