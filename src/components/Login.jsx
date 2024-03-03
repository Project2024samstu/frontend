import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { setUser } from '../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '' })
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.user.isAuth)

	const onSubmit = async (e) => {
		e.preventDefault()
		// const response = await fetch('http://localhost:3000/api/auth/login', {
		// 	method: 'POST',
		// 	body: JSON.stringify(formData),
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// })
		// const data = await response.json()
		dispatch(setUser(formData))
		navigate('/')
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

			<button>Войти</button>
			<Link to='/register'>Зарегистрироваться</Link>
		</form>
	)
}
export default Login
