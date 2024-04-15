import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export const Register = () => {
	const [formData, setFormData] = useState({ email: '', password: '' })
	const navigate = useNavigate()
	const isAuth = false

	const onSubmit = async (e) => {
		e.preventDefault()
		// const response = await fetch(
		// 	'http://localhost:3000/api/auth/registration',
		// 	{
		// 		method: 'POST',
		// 		body: JSON.stringify(formData),
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	}
		// )
		// const data = await response.json()

		// if (response.status === 200) {
		alert('Пользователь успешно создан!')
		navigate('/login')
		// } else {
		// 	alert(data.message)
		// }
	}

	if (isAuth) {
		return <Navigate to='/' replace={true} />
	}

	return (
		<form onSubmit={onSubmit}>
			<input
				type='email'
				onChange={(e) =>
					setFormData({ ...formData, email: e.target.value })
				}
			/>
			<input
				type='password'
				onChange={(e) =>
					setFormData({ ...formData, password: e.target.value })
				}
			/>

			<button>Зарегистрироваться</button>
			<Link to='/login'>Уже есть аккаунт?</Link>
		</form>
	)
}
