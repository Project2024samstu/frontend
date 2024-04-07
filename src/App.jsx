import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/Login'
import Account from './components/Account'
import Main from './components/Main'
import Register from './components/Register'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { useSelector } from 'react-redux'

function App() {
	const isModalOpen = useSelector((state) => state.app.isModalOpen)
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Main />} />
						<Route path='/register' element={<Register />} />

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
