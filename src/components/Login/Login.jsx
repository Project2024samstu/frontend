import { useDispatch } from 'react-redux'
import { Modal } from '../Modal/Modal'
import { closeLogin } from '../../store/appSlice'
import styles from './Login.module.scss'
import { setUser } from '../../store/userSlice'

export const Login = () => {
	const dispatch = useDispatch()

	const data = { username: 'Vasya', password: '1246345' }
	const url = 'http://localhost:8080/login'

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch(url, {
				method: 'POST', // или 'PUT'
				body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
			})
			const json = await response.json()
			dispatch(setUser(json))
			dispatch(closeLogin())
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	return (
		<Modal title='Вход' onClose={() => dispatch(closeLogin())}>
			<form onSubmit={(e) => handleSubmit(e)} className={styles.Login}>
				<input
					className={styles.Input}
					placeholder='E-Mail'
					type='email'
				/>
				<input
					className={styles.Input}
					placeholder='Пароль'
					type='password'
				/>

				<button type='submit'>Войти</button>
			</form>
		</Modal>
	)
}
