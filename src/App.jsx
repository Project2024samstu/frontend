import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/Login'
import Account from './components/Account'
import Main from './components/Main'
import Register from './components/Register'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					<Route path='/login' element={<Login />} />
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
	)
}

export default App
