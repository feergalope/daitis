import React, { useState } from 'react';
import styled from 'styled-components';
import { CalendarHeader } from './CalendarHeader';
import { getDaysInMonth, formatMonthYear, isSelectedMonth } from '../../utils/calendar/monthUtils';
import { DayModal } from './DayModal';
import { Meal } from '../Meal';

const MonthViewContainer = styled.div`
	height: auto;
`;

const CalendarGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 0.25rem;
	padding: 0.2rem;
	background-color: var(--color-stone);
	border-radius: 0.5rem;
	overflow: hidden;
	border: 1px solid var(--color-stone);	
`;

const DayHeader = styled.div`
	background-color: var(--color-stone);
	color: var(--color-graphite-dark);
	padding: 0.75rem 0.5rem;
	text-align: center;
	font-weight: 600;
	font-size: 0.8rem;
	text-transform: uppercase;
`;

const DayCell = styled.div`
	background-color: var(--color-milk-light);
	min-height: 80px;
	padding: 0.5rem;
	position: relative;
	border-radius: 0.5rem;
	cursor: ${props => props.$hasMeals ? 'pointer' : 'default'};
	transition: all 0.2s ease;

	&:hover {
		${props => props.$hasMeals && `
			background-color: var(--color-stone);
			transform: translateY(-2px);
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		`}
	}

	&.other-month {
		background-color: var(--color-milk);
		color: var(--color-stone-dark);
		opacity: 0.25;
	}

	&.current-day {
		border: 5px solid var(--color-desert-light);
		opacity: 1;
		padding: 0.25rem;
	}
`;

const DayNumber = styled.div`
	color: var(--color-graphite-dark);
	font-weight: 500;
	font-size: 0.9rem;
	margin-bottom: 0.25rem;
`;

const MoreMeals = styled.div`
	color: var(--color-graphite);
	font-size: 0.7rem;
	font-style: italic;
	margin-top: 0.25rem;
`;

const dayLabels = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

export function MonthCalendar({ 
	currentDate, 
	viewType, 
	onViewChange, 
	onNavigate, 
	onGoToToday,
	meals
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedMeals, setSelectedMeals] = useState([]);
	
	const today = new Date();
	const days = getDaysInMonth(currentDate);

	const handleDayClick = (day, dayEvents, isCurrentMonthDay) => {
		if (dayEvents.length > 0 && isCurrentMonthDay) {
			setSelectedDate(day);
			setSelectedMeals(dayEvents);
			setIsModalOpen(true);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedDate(null);
		setSelectedMeals([]);
	};

	return (
		<MonthViewContainer>
			<CalendarHeader
				title={formatMonthYear(currentDate)}
				viewType={viewType}
				onViewChange={onViewChange}
				onNavigate={onNavigate}
				onGoToToday={onGoToToday}
			/>
			
			<CalendarGrid>
				{dayLabels.map(label => (
					<DayHeader key={label}>{label}</DayHeader>
				))}
				
				{days.map((day, index) => {
					const dayNumber = day.getDate();
					const isCurrentMonthDay = day.getMonth() === currentDate.getMonth();
					const isToday = day.toDateString() === today.toDateString();
					const isSelectedMonthDay = isSelectedMonth(day, currentDate);
					const dayMeals = meals[dayNumber] || [];
					const showMore = dayMeals.length > 3;
					const displayMeals = dayMeals.slice(0, 3);
					const hasMeals = dayMeals.length > 0 && isCurrentMonthDay;
					
					return (
						<DayCell 
							key={index}
							className={`${!isCurrentMonthDay ? 'other-month' : ''} ${isToday ? 'current-day' : ''} ${isCurrentMonthDay && !isSelectedMonthDay ? 'other-week' : ''}`}
							$hasMeals={hasMeals}
							onClick={() => handleDayClick(day, dayMeals, isCurrentMonthDay)}
						>
							<DayNumber>{dayNumber}</DayNumber>
							{displayMeals.map((meal, mealIndex) => (
								<Meal key={mealIndex} meal={meal} size="compact" />
							))}
							{showMore && (
								<MoreMeals>{dayMeals.length - 3} more...</MoreMeals>
							)}
						</DayCell>
					);
				})}
			</CalendarGrid>
			
			<DayModal
				isOpen={isModalOpen}
				onClose={closeModal}
				selectedDate={selectedDate}
				meals={selectedMeals}
			/>
		</MonthViewContainer>
	);
} 