import { useDispatch } from 'react-redux'
import { Modal } from '../Modal/Modal'
import { closeLogin } from '../../store/appSlice'
import styles from './Login.module.scss'

export const Login = () => {
	const dispatch = useDispatch()

	return (
		<Modal onClose={() => dispatch(closeLogin())}>
			<form className={styles.Login}>
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

				<button>Войти</button>
			</form>
		</Modal>
	)
}
