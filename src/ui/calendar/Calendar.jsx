import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MonthCalendar } from './MonthCalendar';
import { WeekCalendar } from './WeekCalendar';
import { useLoading } from '../../context/LoadingContext';

const CalendarWrapper = styled.div`
	position: relative;
	height: 100%;
`;

export function Calendar({ viewType = 'week', onViewChange }) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState({});
	const { isLoading } = useLoading();
	
	// Sample data for the calendar
	const sampleEvents = {
		1: [
			{ title: "Oatmeal with berries", time: "8:00 a.m.", category: "breakfast" },
			{ title: "Grilled chicken salad", time: "1:00 p.m.", category: "lunch" },
			{ title: "Apple slices", time: "3:00 p.m.", category: "snack" },
			{ title: "Salmon with vegetables", time: "7:30 p.m.", category: "dinner" },
			{ title: "Chocolate cake", time: "8:30 p.m.", category: "dessert" }
		],
		2: [
			{ title: "Greek yogurt parfait", time: "7:30 a.m.", category: "breakfast" },
			{ title: "Quinoa bowl", time: "12:30 p.m.", category: "lunch" },
			{ title: "Pasta primavera", time: "8:00 p.m.", category: "dinner" }
		],
		3: [
			{ title: "Avocado toast", time: "8:15 a.m.", category: "breakfast" },
			{ title: "Turkey sandwich", time: "1:15 p.m.", category: "lunch" },
			{ title: "Mixed nuts", time: "4:00 p.m.", category: "snack" },
			{ title: "Beef stir-fry", time: "7:45 p.m.", category: "dinner" }
		],
		4: [
			{ title: "Smoothie bowl", time: "7:45 a.m.", category: "breakfast" },
			{ title: "Caesar salad", time: "12:45 p.m.", category: "lunch" },
			{ title: "Vegetable curry", time: "8:15 p.m.", category: "dinner" },
			{ title: "Ice cream", time: "9:00 p.m.", category: "dessert" }
		],
		5: [
			{ title: "Eggs benedict", time: "8:30 a.m.", category: "breakfast" },
			{ title: "Soup and sandwich", time: "1:30 p.m.", category: "lunch" },
			{ title: "Grilled fish tacos", time: "7:30 p.m.", category: "dinner" }
		],
		6: [
			{ title: "Pancakes with maple syrup", time: "8:00 a.m.", category: "breakfast" },
			{ title: "Mediterranean platter", time: "1:00 p.m.", category: "lunch" },
			{ title: "Popcorn", time: "3:30 p.m.", category: "snack" },
			{ title: "Pizza margherita", time: "8:00 p.m.", category: "dinner" },
			{ title: "Tiramisu", time: "8:45 p.m.", category: "dessert" }
		],
		7: [
			{ title: "French toast", time: "8:15 a.m.", category: "breakfast" },
			{ title: "Sushi roll", time: "1:15 p.m.", category: "lunch" },
			{ title: "Roast chicken", time: "7:45 p.m.", category: "dinner" }
		],
		8: [
			{ title: "Cereal with milk", time: "7:30 a.m.", category: "breakfast" },
			{ title: "Burger and fries", time: "12:30 p.m.", category: "lunch" },
			{ title: "Spaghetti carbonara", time: "8:00 p.m.", category: "dinner" }
		],
		9: [
			{ title: "Bagel with cream cheese", time: "8:00 a.m.", category: "breakfast" },
			{ title: "Chicken wrap", time: "1:00 p.m.", category: "lunch" },
			{ title: "Granola bar", time: "4:15 p.m.", category: "snack" },
			{ title: "Beef lasagna", time: "7:30 p.m.", category: "dinner" },
			{ title: "Cheesecake", time: "8:30 p.m.", category: "dessert" }
		],
		11: [
			{ title: "Waffles with fruit", time: "8:15 a.m.", category: "breakfast" },
			{ title: "Taco bowl", time: "1:15 p.m.", category: "lunch" },
			{ title: "Shrimp scampi", time: "8:00 p.m.", category: "dinner" }
		],
		13: [
			{ title: "Breakfast burrito", time: "7:45 a.m.", category: "breakfast" },
			{ title: "Greek salad", time: "12:45 p.m.", category: "lunch" },
			{ title: "Pork chops", time: "7:45 p.m.", category: "dinner" }
		],
		14: [
			{ title: "Omelette with herbs", time: "8:00 a.m.", category: "breakfast" },
			{ title: "Ramen bowl", time: "1:00 p.m.", category: "lunch" },
			{ title: "Fruit salad", time: "3:45 p.m.", category: "snack" },
			{ title: "Vegetable lasagna", time: "8:15 p.m.", category: "dinner" },
			{ title: "Chocolate mousse", time: "9:00 p.m.", category: "dessert" }
		],
		15: [
			{ title: "Granola with yogurt", time: "7:30 a.m.", category: "breakfast" },
			{ title: "Chicken noodle soup", time: "12:30 p.m.", category: "lunch" },
			{ title: "Grilled steak", time: "8:00 p.m.", category: "dinner" }
		],
		18: [
			{ title: "Toast with jam", time: "8:15 a.m.", category: "breakfast" },
			{ title: "Falafel wrap", time: "1:15 p.m.", category: "lunch" },
			{ title: "Fish and chips", time: "7:30 p.m.", category: "dinner" }
		],
		19: [
			{ title: "Smoothie and toast", time: "7:45 a.m.", category: "breakfast" },
			{ title: "Pad thai", time: "1:00 p.m.", category: "lunch" },
			{ title: "Trail mix", time: "4:00 p.m.", category: "snack" },
			{ title: "Chicken parmesan", time: "8:00 p.m.", category: "dinner" },
			{ title: "Apple pie", time: "8:45 p.m.", category: "dessert" }
		],
		20: [
			{ title: "Cinnamon rolls", time: "8:00 a.m.", category: "breakfast" },
			{ title: "Buddha bowl", time: "12:45 p.m.", category: "lunch" },
			{ title: "Beef tacos", time: "7:45 p.m.", category: "dinner" }
		],
		21: [
			{ title: "Breakfast sandwich", time: "7:30 a.m.", category: "breakfast" },
			{ title: "Caesar wrap", time: "1:30 p.m.", category: "lunch" },
			{ title: "Pasta bolognese", time: "8:15 p.m.", category: "dinner" }
		],
		24: [
			{ title: "Croissant and coffee", time: "8:15 a.m.", category: "breakfast" },
			{ title: "Sushi bento", time: "1:00 p.m.", category: "lunch" },
			{ title: "Yogurt with honey", time: "3:30 p.m.", category: "snack" },
			{ title: "Roast beef", time: "7:30 p.m.", category: "dinner" },
			{ title: "Strawberry shortcake", time: "8:30 p.m.", category: "dessert" }
		],
		25: [
			{ title: "Muffins with butter", time: "8:00 a.m.", category: "breakfast" },
			{ title: "Chicken curry", time: "1:15 p.m.", category: "lunch" },
			{ title: "Grilled salmon", time: "8:00 p.m.", category: "dinner" }
		],
		27: [
			{ title: "Pancakes and bacon", time: "7:45 a.m.", category: "breakfast" },
			{ title: "Tuna salad", time: "12:30 p.m.", category: "lunch" },
			{ title: "Beef stir-fry", time: "7:45 p.m.", category: "dinner" }
		],
		31: [
			{ title: "Oatmeal with nuts", time: "8:00 a.m.", category: "breakfast" },
			{ title: "Vegetable soup", time: "1:00 p.m.", category: "lunch" },
			{ title: "Crackers and cheese", time: "4:15 p.m.", category: "snack" },
			{ title: "Chicken alfredo", time: "8:00 p.m.", category: "dinner" },
			{ title: "Chocolate chip cookies", time: "8:45 p.m.", category: "dessert" }
		]
	};

	useEffect(() => {
		setEvents(sampleEvents);
	}, []); 
	
	const handleViewChange = (newViewType) => {
		if (onViewChange) {
			onViewChange(newViewType);
		}
	};

	const navigateMonth = (direction) => {
		setCurrentDate(prev => {
			const newDate = new Date(prev);
			newDate.setMonth(newDate.getMonth() + direction);
			return newDate;
		});
	};

	const navigateWeek = (direction) => {
		setCurrentDate(prev => {
			const newDate = new Date(prev);
			newDate.setDate(newDate.getDate() + (direction * 7));
			return newDate;
		});
	};

	const goToToday = () => {
		setCurrentDate(new Date());
	};

	const handleNavigate = (direction) => {
		if (viewType === 'week') {
			navigateWeek(direction);
		} else {
			navigateMonth(direction);
		}
	};

	return (
		<CalendarWrapper>
			{viewType === 'week' ? (
				<WeekCalendar
					currentDate={currentDate}
					viewType={viewType}
					onViewChange={handleViewChange}
					onNavigate={handleNavigate}
					onGoToToday={goToToday}
					events={events}
				/>
			) : (
				<MonthCalendar
					currentDate={currentDate}
					viewType={viewType}
					onViewChange={handleViewChange}
					onNavigate={handleNavigate}
					onGoToToday={goToToday}
					events={events}
				/>
			)}
		</CalendarWrapper>
	);
} 