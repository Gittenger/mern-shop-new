import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'

import Home from './components/Home'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import ImageUpload from './components/ImageUpload'

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
			<AdminRoute path="/admin/addImage" exact component={ImageUpload} />
		</Switch>
	</BrowserRouter>
)

export default Routes
