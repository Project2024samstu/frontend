import { Link } from 'react-router-dom'
import styles from './Landing.module.scss'

export const Landing = () => {
	return (
		<div className='container'>
			<div className={styles.Landing}>
				<div className={styles.Links}>
					<Link className='button'>Демо ЛК преподавателя</Link>
					<Link className='button'>Демо ЛК ученика</Link>
				</div>
			</div>
		</div>
	)
}
