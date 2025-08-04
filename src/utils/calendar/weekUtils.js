/**
 * Gets all days in a week for a given date
 * @param {Date} date - The date to get the week for
 * @returns {Date[]} Array of 7 dates representing the week
 */
export const getDaysInWeek = (date) => {
	const current = new Date(date);
	const week = [];
	const dayOfWeek = current.getDay();
	const diff = current.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
	
	for (let i = 0; i < 7; i++) {
		const day = new Date(current.getFullYear(), current.getMonth(), diff + i);
		week.push(day);
	}
	
	return week;
};

/**
 * Formats a week range for display
 * @param {Date} date - The date to format the week range for
 * @returns {string} Formatted week range string
 */
export const formatWeekRange = (date) => {
	const weekDays = getDaysInWeek(date);
	const start = weekDays[0];
	const end = weekDays[6];
	
	const startStr = start.toLocaleDateString('es-ES', { 
		month: 'short', 
		day: 'numeric',
		year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
	});
	const endStr = end.toLocaleDateString('es-ES', { 
		month: 'short', 
		day: 'numeric', 
		year: 'numeric' 
	});
	
	return `${startStr} - ${endStr}`;
}; 