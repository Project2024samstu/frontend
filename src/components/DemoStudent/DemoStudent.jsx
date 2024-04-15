import React from 'react'
import CreatingAndCheckingTasks from '../CreateAndCheckingTasks/CreateAndChekingTasks'
import './DemoStudent.scss'

const DemoStudent = () => {
	return (
		<div className='demo-student'>
			<h1>Личный кабинет студента</h1>
			<CreatingAndCheckingTasks />
		</div>
	)
}

export default DemoStudent
