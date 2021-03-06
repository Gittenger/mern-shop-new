import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from '../utils/utils-index.js'

const { checkAuthToken } = auth

const AdminRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			checkAuthToken() && checkAuthToken().user.role === 'admin' ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/', state: { from: props.location } }} />
			)
		}
	></Route>
)

export default AdminRoute
