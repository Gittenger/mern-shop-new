import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'

import Home from './components/Home'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import ImageUpload from './components/ImageUpload'
import ImageDelete from './components/ImageDelete'
import Gallery from './components/Gallery'

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/gallery" exact component={Gallery} />
			<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
			<AdminRoute path="/admin/addImage" exact component={ImageUpload} />
			<AdminRoute path="/admin/deleteImages" exact component={ImageDelete} />
		</Switch>
	</BrowserRouter>
)

export default Routes
