import { API } from '../env'

export const auth = {
	authUser: function (user, options) {
		return fetch(`${API}/users/${options.authRoute}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then(res => res.json())
			.catch(err => {
				console.log(err)
			})
	},
	setAuthToken: function (data, next) {
		if (window !== undefined) {
			localStorage.setItem('jwt', JSON.stringify(data))
		}
		next()
	},
	checkAuthToken: function () {
		return typeof window == undefined
			? false
			: localStorage.getItem('jwt')
			? JSON.parse(localStorage.getItem('jwt'))
			: false
	},
}
