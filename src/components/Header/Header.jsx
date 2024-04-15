import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { openLogin } from '../../store/appSlice'
import { logOut } from '../../store/userSlice'
import styles from './Header.module.scss'
import { useState } from 'react'

export const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.user.isAuth)
	const [isDropDownVisible, setIsDropDownVisible] = useState(false)

	if (!isAuth) {
		return (
			<header className={styles.Header}>
				<div className='container'>
					<div className={styles.Content}>
						<div className={styles.Logo}>
							<Link className='link'>Лого</Link>
						</div>
						<div className={styles.Menu}>
							<Link>О нас</Link>
							<div
								onMouseOver={() => setIsDropDownVisible(true)}
								onMouseLeave={() => setIsDropDownVisible(false)}
								className={styles.DropDownContainer}
							>
								<div
									className={`button ${styles.DropDownButton}`}
								>
									Демо
								</div>
								{isDropDownVisible && (
									<div className={styles.DropDownMenu}>
										<Link
											to='/demoStudent'
											className='button'
										>
											ЛК студента
										</Link>
										<Link
											to='/demoTeacher'
											className='button'
										>
											ЛК преподавателя
										</Link>
									</div>
								)}
							</div>
						</div>
						<div className={styles.Auth}>
							<button
								onClick={() => {
									dispatch(openLogin())
								}}
							>
								Вход
							</button>
							<Link to='/register'>Регистрация</Link>
						</div>
					</div>
				</div>
			</header>
		)
	}

	return (
		<>
			<button
				onClick={() => {
					dispatch(logOut())
					navigate('/')
				}}
			>
				Выйти
			</button>
			<Link to='/account'>Аккаунт</Link>
		</>
	)
}
