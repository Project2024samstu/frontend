import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoginOpen: false,
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		openLogin(state) {
			state.isModalOpen = true
		},
		closeLogin(state) {
			state.isModalOpen = false
		},
	},
})

export const { openLogin, closeLogin } = appSlice.actions

export default appSlice.reducer
