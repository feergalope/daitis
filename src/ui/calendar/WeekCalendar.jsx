import React, { useState } from 'react';
import styled from 'styled-components';
import { CalendarHeader } from './CalendarHeader';
import { getDaysInWeek, formatWeekRange } from '../../utils/calendar/weekUtils';
import { DayModal } from './DayModal';
import { Meal } from '../Meal';

const WeekViewContainer = styled.div`
	padding: 1rem;
	height: auto;
	transition: all 1s ease;
`;

const WeekGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 1px;
	background-color: var(--color-stone);
	border-radius: 0.5rem;
	overflow: hidden;
	transition: all 1s ease;
	gap: 0.25rem;
	padding: 0.2rem;

	/* Mobile styles */
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 0.5rem;
		padding: 0.5rem;
		background-color: transparent;
	}
`;

const WeekDayCell = styled.div`
	background-color: var(--color-milk-light);
	min-height: 120px;
	padding: 0.5rem;
	position: relative;
	transition: all 1s ease;
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

	&.current-day {
		border: 5px solid var(--color-desert-light);
		opacity: 1;
		padding: 0.25rem;
	}

	/* Mobile styles */
	@media (max-width: 768px) {
		min-height: auto;
		padding: 1rem;
		border: 1px solid var(--color-stone);
	}
`;

const WeekDayHeader = styled.div`
	background-color: var(--color-stone);
	color: var(--color-graphite-dark);
	padding: 0.75rem 0.5rem;
	text-align: center;
	font-weight: 600;
	font-size: 0.8rem;
	text-transform: uppercase;

	/* Mobile styles */
	@media (max-width: 768px) {
		display: none;
	}
`;

const WeekDayNumber = styled.div`
	color: var(--color-graphite-dark);
	font-weight: 500;
	font-size: 0.9rem;
	margin-bottom: 0.25rem;

	/* Mobile styles */
	@media (max-width: 768px) {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
`;

const MobileDayHeader = styled.div`
	display: none;
	color: var(--color-graphite-dark);
	font-weight: 600;
	font-size: 0.9rem;
	text-transform: uppercase;
	margin-bottom: 0.5rem;

	/* Mobile styles */
	@media (max-width: 768px) {
		display: block;
	}
`;

const MoreMeals = styled.div`
	color: var(--color-graphite);
	font-size: 0.7rem;
	font-style: italic;
	margin-top: 0.25rem;
`;

const dayLabels = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

export function WeekCalendar({ 
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
	const weekDays = getDaysInWeek(currentDate);

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
		<WeekViewContainer>
			<CalendarHeader
				title={formatWeekRange(currentDate)}
				viewType={viewType}
				onViewChange={onViewChange}
				onNavigate={onNavigate}
				onGoToToday={onGoToToday}
			/>
			
			<WeekGrid>
				{dayLabels.map(label => (
					<WeekDayHeader key={label}>{label}</WeekDayHeader>
				))}
				
				{weekDays.map((day, index) => {
					const dayNumber = day.getDate();
					const isToday = day.toDateString() === today.toDateString();
					const isCurrentMonthDay = day.getMonth() === currentDate.getMonth();
					const dayMeals = meals[dayNumber] || [];
					const showMore = dayMeals.length > 3;
					const displayMeals = dayMeals.slice(0, 3);
					const hasMeals = dayMeals.length > 0 && isCurrentMonthDay;
					
					return (
						<WeekDayCell 
							key={index}
							className={isToday ? 'current-day' : ''}
							$hasMeals={hasMeals}
							onClick={() => handleDayClick(day, dayMeals, isCurrentMonthDay)}
						>
							<MobileDayHeader>{dayLabels[index]}</MobileDayHeader>
							<WeekDayNumber>{dayNumber}</WeekDayNumber>
							{displayMeals.map((meal, mealIndex) => (
								<Meal key={mealIndex} meal={meal} size="compact" />
							))}
							{showMore && (
								<MoreMeals>+{dayMeals.length - 3} more</MoreMeals>
							)}
						</WeekDayCell>
					);
				})}
			</WeekGrid>
			
			<DayModal
				isOpen={isModalOpen}
				onClose={closeModal}
				selectedDate={selectedDate}
				meals={selectedMeals}
			/>
		</WeekViewContainer>
	);
} 