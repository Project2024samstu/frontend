import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { openLogin } from '../../store/appSlice'
import styles from './Register.module.scss'

export const Register = () => {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const dispatch = useDispatch()
	const isAuth = false

	const onSubmit = async (e) => {
		e.preventDefault()
		const response = await fetch('http://localhost:8080/register', {
			method: 'POST',
			body: JSON.stringify(formData),
		})
		const data = await response.json()

		if (response.status === 200) {
			alert('Пользователь успешно создан!')
			dispatch(openLogin())
		} else {
			alert(data.message)
		}
	}

	if (isAuth) {
		return <Navigate to='/' replace={true} />
	}

	return (
		<form onSubmit={onSubmit} className={styles.Register}>
			<input
				onChange={(e) =>
					setFormData({ ...formData, username: e.target.value })
				}
			/>
			<input
				type='password'
				onChange={(e) =>
					setFormData({ ...formData, password: e.target.value })
				}
			/>

			<button>Зарегистрироваться</button>
			<button
				type='button'
				onClick={() => {
					dispatch(openLogin())
				}}
			>
				Уже есть аккаунт?
			</button>
		</form>
	)
}
