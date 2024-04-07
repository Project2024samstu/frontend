import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../store/userSlice'
import { openModal } from '../store/appSlice'

const Main = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.user.isAuth)

	if (!isAuth) {
		return (
			<>
				<button
					onClick={() => {
						dispatch(openModal())
					}}
				>
					Войти
				</button>
				<Link to='/register'>Зарегистрироваться</Link>
			</>
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
export default Main
