/**
 * Gets all days in a month for a given date, including padding days
 * @param {Date} date - The date to get the month for
 * @returns {Date[]} Array of dates representing the month grid
 */
export const getDaysInMonth = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const startDate = new Date(firstDay);
	startDate.setDate(startDate.getDate() - firstDay.getDay() + 1);
	
	const days = [];
	const current = new Date(startDate);
	
	// Stop when we reach the last day of the month
	while (current <= lastDay) {
		days.push(new Date(current));
		current.setDate(current.getDate() + 1);
	}
	
	// If the last day is not Sunday, fill the rest of the week
	if (lastDay.getDay() !== 0) { // 0 = Sunday
		const daysToAdd = 7 - lastDay.getDay();
		for (let i = 0; i < daysToAdd; i++) {
			days.push(new Date(current));
			current.setDate(current.getDate() + 1);
		}
	}
	
	return days;
};

/**
 * Formats a month and year for display
 * @param {Date} date - The date to format
 * @returns {string} Formatted month and year string
 */
export const formatMonthYear = (date) => {
	const options = { month: 'long', year: 'numeric' };
	const formatted = date.toLocaleDateString('es-ES', options);
	return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/**
 * Checks if a date is in the selected month
 * @param {Date} date - The date to check
 * @param {Date} selectedDate - The selected month/year
 * @returns {boolean} True if the date is in the selected month
 */
export const isSelectedMonth = (date, selectedDate) => {
	return date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
}; 