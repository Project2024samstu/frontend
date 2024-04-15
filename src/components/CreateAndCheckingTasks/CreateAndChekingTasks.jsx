import React, { useState } from 'react'
import { evaluate } from 'mathjs'

const CreatingAndCheckingTasks = ({ onGenerate }) => {
	const [numTasks, setNumTasks] = useState(5)
	const [tasks, setTasks] = useState([])

	const generateTask = () => {
		const variableValue = Math.floor(Math.random() * 10) + 1
		const formula = `sin(${variableValue}*x)`
		const answerTemplate = `${variableValue} * cos(${variableValue}*x)`

		return {
			formula,
			answerTemplate,
			answer: '',
			isCorrect: null,
		}
	}

	const generateTasks = () => {
		const generatedTasks = []
		for (let i = 0; i < numTasks; i++) {
			const task = generateTask()
			generatedTasks.push(task)
		}
		setTasks(generatedTasks)
		onGenerate(generatedTasks)
	}

	const checkAnswer = (index) => {
		try {
			const task = tasks[index]
			const randomXValue = Math.floor(Math.random() * 10) + 1
			const userAnswer = task.answer.replace(
				/(\bx\b)/g,
				`(${randomXValue})`
			)
			const expectedAnswer = task.answerTemplate.replace(
				/(\bx\b)/g,
				`(${randomXValue})`
			)

			const userResult = evaluate(userAnswer)
			const expectedResult = evaluate(expectedAnswer)

			const isCorrect = Math.abs(userResult - expectedResult) < 0.001

			setTasks((prevTasks) => [
				...prevTasks.slice(0, index),
				{ ...prevTasks[index], isCorrect },
				...prevTasks.slice(index + 1),
			])

			if (isCorrect) {
				alert('Верно!')
			} else {
				alert('Неверно.')
			}
		} catch (error) {
			alert('Ошибка при вычислении ответа.')
			console.error(error)
		}
	}

	return (
		<div className='creating-and-checking-tasks-container'>
			<div>
				<label htmlFor='numTasks'>Количество заданий: </label>
				<input
					type='number'
					id='numTasks'
					value={numTasks}
					onChange={(e) => setNumTasks(e.target.value)}
				/>
			</div>
			<br />
			<br />
			<div>
				<button onClick={generateTasks}>Генерировать задания</button>
			</div>
			<br />
			<br />
			<div className='tasks-container'>
				{tasks.map((task, index) => (
					<div key={index} className='task-item'>
						<p className='task-formula'>Формула: {task.formula}</p>
						<input
							type='text'
							className='task-input'
							placeholder='Введите ответ'
							value={task.answer}
							onChange={(e) => {
								const newTasks = [...tasks]
								newTasks[index].answer = e.target.value
								setTasks(newTasks)
							}}
						/>
						<button
							className='task-button'
							onClick={() => checkAnswer(index)}
						>
							Проверить
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default CreatingAndCheckingTasks
