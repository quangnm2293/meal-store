/* eslint-disable no-case-declarations */
export const reducers = (state, action) => {
	switch (action.type) {
		case 'CRUD_MEAL':
			let newState = { ...state };
			newState.modal = action.payload;
			return (state = newState);

		case 'ADD_MEAL':
			return { ...state, meals: [...state.meals, action.payload] };

		case 'UPDATE_MEAL':
			let editState = { ...state };
			const index = editState.meals.findIndex(meal => meal.name === action.payload.name);
			console.log(editState.meals[index]);
			editState.meals[index].count = action.payload.count;
			return (state = editState);

		case 'DELETE_MEAL':
			return { ...state, meals: action.payload };

		default:
			state;
	}
};
