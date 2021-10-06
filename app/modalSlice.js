import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchByName } from '../api/mealAPI';

export const updateMeal = createAsyncThunk('modal/updateMeal', async name => {
	const meals = await fetchByName(name);
	return { meals, name };
});

const modalSlice = createSlice({
	name: 'modal',
	initialState: {},
	reducers: {
		dispatchModal: (state, action) => {
			return action.payload;
		},
	},
	extraReducers: {
		[updateMeal.fulfilled]: (state, action) => {
			return { type: 'Edit', name: action.payload.name, count: action.payload.meals.length };
		},
	},
});

export const { dispatchModal } = modalSlice.actions;

const { reducer: modalReducer } = modalSlice;

export default modalReducer;
