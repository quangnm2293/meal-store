import { createSlice } from '@reduxjs/toolkit';

const mealSlice = createSlice({
	name: 'meal',
	initialState: [],
	reducers: {
		addMeal: (state, action) => {
			state.push(action.payload);
		},
		deleteMealState: (state, action) => {
			return action.payload;
		},
		updateMeal: (state, action) => {
			const index = state.findIndex(meal => meal.name === action.payload.name);
			state[index] = action.payload;
			return state;
		},
	},
});

const { actions, reducer: mealReducer } = mealSlice;

export const { addMeal, deleteMealState, updateMeal } = actions;

export default mealReducer;
