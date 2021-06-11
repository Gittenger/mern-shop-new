import React, { useState } from 'react'
import { LoginFormContainer } from './Login.styles'
import { auth } from '../utils/utils-index'

const { authUser } = auth

const Login = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
	})

	const { email, password } = values

	const handleChange = name => event => {
		setValues({
			...values,
			[name]: event.target.value,
		})
	}

	const handleSubmit = event => {
		event.preventDefault()
		authUser({ email, password }, { authRoute: 'login' }).then(res => {
			console.log(res)
		})
	}

	const LoginForm = () => (
		<LoginFormContainer>
			<div>
				<label>Email</label>
				<input type="email" value={email} onChange={handleChange('email')} />
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={handleChange('password')}
				/>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</LoginFormContainer>
	)

	return (
		<>
			<h1>Login Page</h1>
			{LoginForm()}
		</>
	)
}

export default Login
