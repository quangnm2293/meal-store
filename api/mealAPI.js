const API_SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const mealAPI = {
	fetchByName: async name => {
		const res = await fetch(`${API_SEARCH}${name}`);
		const { meals } = await res.json();
		return meals;
	},
};

export const { fetchByName } = mealAPI;

export default mealAPI;
