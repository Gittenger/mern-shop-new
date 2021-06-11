import { API } from '../env'

export const auth = {
	authUser: function (user, options) {
		return fetch(`${API}/${options.authRoute}`, {
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
}
