import React, { useState, useEffect } from 'react'
import './DemoTeacher.scss'
import { evaluate } from 'mathjs'

const DemoTeacher = () => {
	// Состояния для формулы, шаблона ответа, переменных, имени переменной, минимального и максимального значений переменных, количества заданий и списка заданий
	const [formula, setFormula] = useState('')
	const [answerTemplate, setAnswerTemplate] = useState('')
	const [variables, setVariables] = useState([])
	const [variableName, setVariableName] = useState('')
	const [minValue, setMinValue] = useState('')
	const [maxValue, setMaxValue] = useState('')
	const [numTasks, setNumTasks] = useState(5)
	const [tasks, setTasks] = useState([])

	// Эффект для загрузки сохраненной формулы из локального хранилища
	useEffect(() => {
		const savedFormula = localStorage.getItem('formula')
		if (savedFormula) {
			setFormula(savedFormula)
		}
	}, [])

	// Добавление новой переменной
	const handleAddVariable = () => {
		if (
			variableName &&
			!isNaN(minValue) &&
			!isNaN(maxValue) &&
			parseInt(minValue) < parseInt(maxValue)
		) {
			if (variables.some((variable) => variable.name === variableName)) {
				alert('Переменная с таким именем уже существует.')
				return
			}

			const newVariable = {
				name: variableName,
				min: parseInt(minValue),
				max: parseInt(maxValue),
			}

			setVariables((prevVariables) => [...prevVariables, newVariable])
			setVariableName('')
			setMinValue('')
			setMaxValue('')
		}
	}

	// Удаление переменной по индексу
	const handleDeleteVariable = (index) => {
		const updatedVariables = [...variables]
		updatedVariables.splice(index, 1)
		setVariables(updatedVariables)
	}

	// Генерация заданий
	const handleGenerateTasks = () => {
		const generatedTasks = Array.from({ length: numTasks }, generateTask)
		setTasks(generatedTasks)
	}

	// Генерация одного задания
	const generateTask = () => {
		let taskFormula = formula
		let taskAnswerTemplate = answerTemplate

		variables.forEach(({ name, min, max }) => {
			const value = min + Math.floor(Math.random() * (max - min + 1))
			taskFormula = taskFormula.replace(new RegExp(name, 'g'), value)
			taskAnswerTemplate = taskAnswerTemplate.replace(
				new RegExp(name, 'g'),
				value
			)
		})

		return {
			formula: taskFormula,
			answerTemplate: taskAnswerTemplate,
			answer: '',
			isCorrect: null,
		}
	}

	// Эффект для сохранения формулы в локальное хранилище
	useEffect(() => {
		localStorage.setItem('formula', formula)
	}, [formula])

	// Проверка ответа на заданном индексе задания
	const checkAnswer = (index) => {
		try {
			const task = tasks[index]
			const randomXValue = generateRandomXValue()
			const userResult = evaluate(task.answer, { x: randomXValue })
			const expectedResult = evaluate(task.answerTemplate, {
				x: randomXValue,
			})

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

			// Для отладки
			console.log(
				'Число, которое подставляется вместо x:' + '\n' + randomXValue
			)
			console.log('Численные значения выражений:' + '\n')
			console.log(
				'Подсчет значения выражения введенного пользователем: ' +
					evaluate(task.answer, { x: randomXValue })
			)
			console.log(
				'Подсчет значения шаблонного выражения:' +
					evaluate(task.answerTemplate, {
						x: randomXValue,
					})
			)
			// Для отладки
		} catch (error) {
			alert('Ошибка при вычислении ответа.')
			console.error(error)
		}
	}

	// Генерация случайного значения для переменной х
	const generateRandomXValue = () => {
		return Math.random()
	}

	return (
		<div id='container'>
			<div className='container-generate-tasks'>
				{/* Информация для преподавателя */}
				<br />
				<br />
				<div>
					<p>
						<h2>Уважаемый Преподаватель!</h2>
						<br />
						<p>Учтите, что производные функций берутся по x. </p>
					</p>
				</div>
				<br />
				{/* Форма для ввода формулы */}
				<div>
					<label htmlFor='formula'>Формула: </label>
					<input
						placeholder='Например: sin(a*x)'
						type='text'
						id='formula'
						value={formula}
						onChange={(e) => setFormula(e.target.value)}
					/>
				</div>
				{/* Форма для ввода переменной */}
				<div>
					<label htmlFor='variableName'>name:</label>
					<input
						type='text'
						value={variableName}
						onChange={(e) => setVariableName(e.target.value)}
					/>
					<label htmlFor='minValue'>min:</label>
					<input
						type='number'
						value={minValue}
						onChange={(e) => setMinValue(e.target.value)}
					/>
					<label htmlFor='maxValue'>max:</label>
					<input
						type='number'
						value={maxValue}
						onChange={(e) => setMaxValue(e.target.value)}
					/>
					<button onClick={handleAddVariable}>Добавить</button>
				</div>
				{/* Таблица для отображения переменных */}
				<table>
					<thead>
						<tr>
							<th>name</th>
							<th>min</th>
							<th>max</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{variables.map((variable, index) => (
							<tr key={index}>
								<td>{variable.name}</td>
								<td>{variable.min}</td>
								<td>{variable.max}</td>
								<td>
									<button
										onClick={() =>
											handleDeleteVariable(index)
										}
									>
										Удалить
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<br />
				<br />
				{/* Форма для ввода шаблона ответа */}
				<div>
					<label htmlFor='answerTemplate'>Ответ: </label>
					<input
						placeholder='Например: a*cos(a*x)'
						type='text'
						id='answerTemplate'
						value={answerTemplate}
						onChange={(e) => setAnswerTemplate(e.target.value)}
					/>
				</div>
				{/* Форма для выбора количества заданий */}
				<div>
					<label htmlFor='numTasks'>Количество заданий: </label>
					<input
						type='number'
						id='numTasks'
						value={numTasks}
						onChange={(e) => setNumTasks(e.target.value)}
					/>
				</div>
			</div>
			{/* Область для отображения заданий */}
			<div className='view-task'>
				<div>
					<input
						type='button'
						onClick={handleGenerateTasks}
						value='Генерировать задания'
					/>
				</div>
				<br />
				<div id='tasks'>
					{tasks.map((task, index) => (
						<div key={index} className='task-container'>
							<div className='task'>{task.formula}</div>
							<input
								type='text'
								placeholder='Введите ответ'
								value={task.answer}
								onChange={(e) => {
									const newTasks = [...tasks]
									newTasks[index].answer = e.target.value
									setTasks(newTasks)
								}}
							/>
							<button
								className='btn-check'
								onClick={() => checkAnswer(index)}
							>
								Проверить
							</button>
							{/* Отображение статуса верности ответа */}
							<div
								className={
									task.isCorrect
										? 'circle correct'
										: task.isCorrect === false
										? 'circle incorrect'
										: 'circle'
								}
							></div>
							<br />
							<br />
							{/* Отображение ожидаемого ответа */}
							<div className='answer-template'>
								Ожидаемый ответ: {task.answerTemplate}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DemoTeacher
