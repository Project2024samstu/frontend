import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Login } from './components/Login/Login'
import { Account } from './components/Account'
import { Landing } from './components/Landing/Landing'
import { Register } from './components/Register/Register'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import DemoTeacher from './components/DemoTeacher/DemoTeacher'
import DemoStudent from './components/DemoStudent/DemoStudent'
import { useSelector } from 'react-redux'

function App() {
	const isModalOpen = useSelector((state) => state.app.isModalOpen)
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Landing />} />
						<Route path='/demoTeacher' element={<DemoTeacher />} />
						<Route path='/register' element={<Register />} />
						<Route path='/demoStudent' element={<DemoStudent />} />

						<Route
							path='/account'
							element={
								<RequireAuth>
									<Account />
								</RequireAuth>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
			{isModalOpen && <Login />}
		</>
	)
}

export default App
