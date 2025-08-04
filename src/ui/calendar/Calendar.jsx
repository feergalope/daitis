import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MonthCalendar } from './MonthCalendar';
import { WeekCalendar } from './WeekCalendar';
import { useLoading } from '../../context/LoadingContext';
import { mealService } from '../../services/mealService';

const CalendarWrapper = styled.div`
	position: relative;
	height: 100%;
`;

export function Calendar({ viewType = 'week', onViewChange }) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [meals, setMeals] = useState({});
	const { isLoading } = useLoading();
	
	useEffect(() => {
		const loadMeals = async () => {
			try {
				const monthMeals = await mealService.getMealsByMonth(
					currentDate.getFullYear(),
					currentDate.getMonth() + 1
				);
				setMeals(monthMeals);
			} catch (error) {
				console.error('Error loading meals:', error);
				setMeals({});
			}
		};

		loadMeals();
	}, [currentDate]); 
	
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
					meals={meals}
				/>
			) : (
				<MonthCalendar
					currentDate={currentDate}
					viewType={viewType}
					onViewChange={handleViewChange}
					onNavigate={handleNavigate}
					onGoToToday={goToToday}
					meals={meals}
				/>
			)}
		</CalendarWrapper>
	);
} 