import React from 'react'
import '../modal.scss'
import { useDispatch } from 'react-redux'
import { closeModal } from '../store/appSlice'
import { Link } from 'react-router-dom'

function Login() {
	const dispatch = useDispatch()

	return (
		<div className='App'>
			<div className='overlay'>
				<div className='modal'>
					<button onClick={() => dispatch(closeModal())}>x</button>
					<form className='form'>
						<input type='email' />
						<input type='password' />
						<button>Войти</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
