import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchByName } from '../api/mealAPI';

export const updateMeal = createAsyncThunk('modal/updateMeal', async (name, thunkAPI) => {
	thunkAPI.dispatch(loadingModal(true));
	thunkAPI.dispatch(dispatchModal({ type: 'Edit' }));
	const meals = await fetchByName(name);
	thunkAPI.dispatch(loadingModal(false));
	return { meals, name };
});

const modalSlice = createSlice({
	name: 'modal',
	initialState: { loading: false, type: '', meal: {} },
	reducers: {
		dispatchModal: (state, action) => {
			return { ...state, type: action.payload.type, meal: action.payload.meal || state.meal };
		},
		loadingModal: (state, action) => {
			return { ...state, loading: action.payload };
		},
	},
	extraReducers: {
		[updateMeal.fulfilled]: (state, action) => {
			return { type: 'Edit', name: action.payload.name, count: action.payload.meals.length };
		},
	},
});

export const { dispatchModal, loadingModal } = modalSlice.actions;

const { reducer: modalReducer } = modalSlice;

export default modalReducer;
