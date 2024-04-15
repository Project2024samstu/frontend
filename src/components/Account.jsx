import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Account = () => {
	const user = useSelector((state) => state.user.currentUser)

	return (
		<>
			<p>Привет {user.email}</p>
			<Link to='/'>На главную</Link>
		</>
	)
}
