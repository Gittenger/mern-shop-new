import React from 'react'
import { AdminDashboardContainer, StyledLink } from './AdminDashboard.styles'

import { auth } from '../utils/utils-index'
const { checkAuthToken } = auth

const AdminDashboard = () => {
	const {
		user: { _id, name, email, role },
	} = checkAuthToken()

	return (
		<AdminDashboardContainer>
			This is the dashboard
			<h1>Hello {name} </h1>
			<p>Email: {email}</p>
			<StyledLink to="/admin/addImage">Add images</StyledLink>
		</AdminDashboardContainer>
	)
}

export default AdminDashboard
