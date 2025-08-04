// Meal service for handling meal data
// This service will eventually connect to a real API
// For now, it uses sample data but is structured for easy API integration

// Sample data - will be replaced with API calls
const sampleEvents = {
	1: [
		{ id: 1, title: "Oatmeal with berries", time: "8:00 a.m.", category: "breakfast", date: "2024-01-01" },
		{ id: 2, title: "Grilled chicken salad", time: "1:00 p.m.", category: "lunch", date: "2024-01-01" },
		{ id: 3, title: "Apple slices", time: "3:00 p.m.", category: "snack", date: "2024-01-01" },
		{ id: 4, title: "Salmon with vegetables", time: "7:30 p.m.", category: "dinner", date: "2024-01-01" },
		{ id: 5, title: "Chocolate cake", time: "8:30 p.m.", category: "dessert", date: "2024-01-01" }
	],
	2: [
		{ id: 6, title: "Greek yogurt parfait", time: "7:30 a.m.", category: "breakfast", date: "2024-01-02" },
		{ id: 7, title: "Quinoa bowl", time: "12:30 p.m.", category: "lunch", date: "2024-01-02" },
		{ id: 8, title: "Pasta primavera", time: "8:00 p.m.", category: "dinner", date: "2024-01-02" }
	],
	3: [
		{ id: 9, title: "Avocado toast", time: "8:15 a.m.", category: "breakfast", date: "2024-01-03" },
		{ id: 10, title: "Turkey sandwich", time: "1:15 p.m.", category: "lunch", date: "2024-01-03" },
		{ id: 11, title: "Mixed nuts", time: "4:00 p.m.", category: "snack", date: "2024-01-03" },
		{ id: 12, title: "Beef stir-fry", time: "7:45 p.m.", category: "dinner", date: "2024-01-03" }
	],
	4: [
		{ id: 13, title: "Smoothie bowl", time: "7:45 a.m.", category: "breakfast", date: "2024-01-04" },
		{ id: 14, title: "Caesar salad", time: "12:45 p.m.", category: "lunch", date: "2024-01-04" },
		{ id: 15, title: "Vegetable curry", time: "8:15 p.m.", category: "dinner", date: "2024-01-04" },
		{ id: 16, title: "Ice cream", time: "9:00 p.m.", category: "dessert", date: "2024-01-04" }
	],
	5: [
		{ id: 17, title: "Eggs benedict", time: "8:30 a.m.", category: "breakfast", date: "2024-01-05" },
		{ id: 18, title: "Soup and sandwich", time: "1:30 p.m.", category: "lunch", date: "2024-01-05" },
		{ id: 19, title: "Grilled fish tacos", time: "7:30 p.m.", category: "dinner", date: "2024-01-05" }
	],
	6: [
		{ id: 20, title: "Pancakes with maple syrup", time: "8:00 a.m.", category: "breakfast", date: "2024-01-06" },
		{ id: 21, title: "Mediterranean platter", time: "1:00 p.m.", category: "lunch", date: "2024-01-06" },
		{ id: 22, title: "Popcorn", time: "3:30 p.m.", category: "snack", date: "2024-01-06" },
		{ id: 23, title: "Pizza margherita", time: "8:00 p.m.", category: "dinner", date: "2024-01-06" },
		{ id: 24, title: "Tiramisu", time: "8:45 p.m.", category: "dessert", date: "2024-01-06" }
	],
	7: [
		{ id: 25, title: "French toast", time: "8:15 a.m.", category: "breakfast", date: "2024-01-07" },
		{ id: 26, title: "Sushi roll", time: "1:15 p.m.", category: "lunch", date: "2024-01-07" },
		{ id: 27, title: "Roast chicken", time: "7:45 p.m.", category: "dinner", date: "2024-01-07" }
	],
	8: [
		{ id: 28, title: "Cereal with milk", time: "7:30 a.m.", category: "breakfast", date: "2024-01-08" },
		{ id: 29, title: "Burger and fries", time: "12:30 p.m.", category: "lunch", date: "2024-01-08" },
		{ id: 30, title: "Spaghetti carbonara", time: "8:00 p.m.", category: "dinner", date: "2024-01-08" }
	],
	9: [
		{ id: 31, title: "Bagel with cream cheese", time: "8:00 a.m.", category: "breakfast", date: "2024-01-09" },
		{ id: 32, title: "Chicken wrap", time: "1:00 p.m.", category: "lunch", date: "2024-01-09" },
		{ id: 33, title: "Granola bar", time: "4:15 p.m.", category: "snack", date: "2024-01-09" },
		{ id: 34, title: "Beef lasagna", time: "7:30 p.m.", category: "dinner", date: "2024-01-09" },
		{ id: 35, title: "Cheesecake", time: "8:30 p.m.", category: "dessert", date: "2024-01-09" }
	],
	11: [
		{ id: 36, title: "Waffles with fruit", time: "8:15 a.m.", category: "breakfast", date: "2024-01-11" },
		{ id: 37, title: "Taco bowl", time: "1:15 p.m.", category: "lunch", date: "2024-01-11" },
		{ id: 38, title: "Shrimp scampi", time: "8:00 p.m.", category: "dinner", date: "2024-01-11" }
	],
	13: [
		{ id: 39, title: "Breakfast burrito", time: "7:45 a.m.", category: "breakfast", date: "2024-01-13" },
		{ id: 40, title: "Greek salad", time: "12:45 p.m.", category: "lunch", date: "2024-01-13" },
		{ id: 41, title: "Pork chops", time: "7:45 p.m.", category: "dinner", date: "2024-01-13" }
	],
	14: [
		{ id: 42, title: "Omelette with herbs", time: "8:00 a.m.", category: "breakfast", date: "2024-01-14" },
		{ id: 43, title: "Ramen bowl", time: "1:00 p.m.", category: "lunch", date: "2024-01-14" },
		{ id: 44, title: "Fruit salad", time: "3:45 p.m.", category: "snack", date: "2024-01-14" },
		{ id: 45, title: "Vegetable lasagna", time: "8:15 p.m.", category: "dinner", date: "2024-01-14" },
		{ id: 46, title: "Chocolate mousse", time: "9:00 p.m.", category: "dessert", date: "2024-01-14" }
	],
	15: [
		{ id: 47, title: "Granola with yogurt", time: "7:30 a.m.", category: "breakfast", date: "2024-01-15" },
		{ id: 48, title: "Chicken noodle soup", time: "12:30 p.m.", category: "lunch", date: "2024-01-15" },
		{ id: 49, title: "Grilled steak", time: "8:00 p.m.", category: "dinner", date: "2024-01-15" }
	],
	18: [
		{ id: 50, title: "Toast with jam", time: "8:15 a.m.", category: "breakfast", date: "2024-01-18" },
		{ id: 51, title: "Falafel wrap", time: "1:15 p.m.", category: "lunch", date: "2024-01-18" },
		{ id: 52, title: "Fish and chips", time: "7:30 p.m.", category: "dinner", date: "2024-01-18" }
	],
	19: [
		{ id: 53, title: "Smoothie and toast", time: "7:45 a.m.", category: "breakfast", date: "2024-01-19" },
		{ id: 54, title: "Pad thai", time: "1:00 p.m.", category: "lunch", date: "2024-01-19" },
		{ id: 55, title: "Trail mix", time: "4:00 p.m.", category: "snack", date: "2024-01-19" },
		{ id: 56, title: "Chicken parmesan", time: "8:00 p.m.", category: "dinner", date: "2024-01-19" },
		{ id: 57, title: "Apple pie", time: "8:45 p.m.", category: "dessert", date: "2024-01-19" }
	],
	20: [
		{ id: 58, title: "Cinnamon rolls", time: "8:00 a.m.", category: "breakfast", date: "2024-01-20" },
		{ id: 59, title: "Buddha bowl", time: "12:45 p.m.", category: "lunch", date: "2024-01-20" },
		{ id: 60, title: "Beef tacos", time: "7:45 p.m.", category: "dinner", date: "2024-01-20" }
	],
	21: [
		{ id: 61, title: "Breakfast sandwich", time: "7:30 a.m.", category: "breakfast", date: "2024-01-21" },
		{ id: 62, title: "Caesar wrap", time: "1:30 p.m.", category: "lunch", date: "2024-01-21" },
		{ id: 63, title: "Pasta bolognese", time: "8:15 p.m.", category: "dinner", date: "2024-01-21" }
	],
	24: [
		{ id: 64, title: "Croissant and coffee", time: "8:15 a.m.", category: "breakfast", date: "2024-01-24" },
		{ id: 65, title: "Sushi bento", time: "1:00 p.m.", category: "lunch", date: "2024-01-24" },
		{ id: 66, title: "Yogurt with honey", time: "3:30 p.m.", category: "snack", date: "2024-01-24" },
		{ id: 67, title: "Roast beef", time: "7:30 p.m.", category: "dinner", date: "2024-01-24" },
		{ id: 68, title: "Strawberry shortcake", time: "8:30 p.m.", category: "dessert", date: "2024-01-24" }
	],
	25: [
		{ id: 69, title: "Muffins with butter", time: "8:00 a.m.", category: "breakfast", date: "2024-01-25" },
		{ id: 70, title: "Chicken curry", time: "1:15 p.m.", category: "lunch", date: "2024-01-25" },
		{ id: 71, title: "Grilled salmon", time: "8:00 p.m.", category: "dinner", date: "2024-01-25" }
	],
	27: [
		{ id: 72, title: "Pancakes and bacon", time: "7:45 a.m.", category: "breakfast", date: "2024-01-27" },
		{ id: 73, title: "Tuna salad", time: "12:30 p.m.", category: "lunch", date: "2024-01-27" },
		{ id: 74, title: "Beef stir-fry", time: "7:45 p.m.", category: "dinner", date: "2024-01-27" }
	],
	31: [
		{ id: 75, title: "Oatmeal with nuts", time: "8:00 a.m.", category: "breakfast", date: "2024-01-31" },
		{ id: 76, title: "Vegetable soup", time: "1:00 p.m.", category: "lunch", date: "2024-01-31" },
		{ id: 77, title: "Crackers and cheese", time: "4:15 p.m.", category: "snack", date: "2024-01-31" },
		{ id: 78, title: "Chicken alfredo", time: "8:00 p.m.", category: "dinner", date: "2024-01-31" },
		{ id: 79, title: "Chocolate chip cookies", time: "8:45 p.m.", category: "dessert", date: "2024-01-31" }
	]
};

// API configuration - will be used when connecting to real API
// const API_CONFIG = {
// 	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
// 	endpoints: {
// 		meals: '/meals',
// 		mealsByDate: '/meals/date',
// 		mealsByMonth: '/meals/month',
// 		mealsByWeek: '/meals/week'
// 	}
// };

// Helper function to format date for API calls
const formatDateForAPI = (date) => {
	return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Helper function to get day number from date
const getDayFromDate = (date) => {
	return date.getDate();
};

// Future API functions - currently return fake data
export const mealService = {
	// Get all meals for a specific date
	async getMealsByDate(date) {
		// TODO: Replace with actual API call
		// const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.mealsByDate}/${formatDateForAPI(date)}`);
		// return await response.json();
		
		const day = getDayFromDate(date);
		return sampleEvents[day] || [];
	},

	// Get all meals for a month
	async getMealsByMonth(year, month) {
		// TODO: Replace with actual API call
		// const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.mealsByMonth}/${year}/${month}`);
		// return await response.json();
		
		// For now, return the sample data organized by day
		return sampleEvents;
	},

	// Get meals for a specific week
	async getMealsByWeek(startDate) {
		// TODO: Replace with actual API call
		// const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.mealsByWeek}/${formatDateForAPI(startDate)}`);
		// return await response.json();
		
		// For now, return sample data for the week
		const weekMeals = {};
		for (let i = 0; i < 7; i++) {
			const date = new Date(startDate);
			date.setDate(date.getDate() + i);
			const day = date.getDate();
			if (sampleEvents[day]) {
				weekMeals[day] = sampleEvents[day];
			}
		}
		return weekMeals;
	},

	// Add a new meal
	async addMeal(mealData) {
		// TODO: Replace with actual API call
		// const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.meals}`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(mealData)
		// });
		// return await response.json();
		
		console.log('Adding meal:', mealData);
		return { success: true, id: Date.now() };
	},

	// Update an existing meal
	async updateMeal(mealId, mealData) {
		// TODO: Replace with actual API call
		// const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.meals}/${mealId}`, {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(mealData)
		// });
		// return await response.json();
		
		console.log('Updating meal:', mealId, mealData);
		return { success: true };
	},

	// Delete a meal
	async deleteMeal(mealId) {
		// TODO: Replace with actual API call
		// const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.meals}/${mealId}`, {
		// 	method: 'DELETE'
		// });
		// return await response.json();
		
		console.log('Deleting meal:', mealId);
		return { success: true };
	}
};

// Export the sample data for backward compatibility
export { sampleEvents }; 