import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isModalOpen: false,
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		openModal(state) {
			state.isModalOpen = true
		},
		closeModal(state) {
			state.isModalOpen = false
		},
	},
})

export const { openModal, closeModal } = appSlice.actions

export default appSlice.reducer