import React, { useState } from 'react';
import styled from 'styled-components';
import { CalendarHeader } from './CalendarHeader';
import { getDaysInWeek, formatWeekRange } from '../../utils/calendar/weekUtils';
import { DayModal } from './DayModal';

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
`;

const WeekDayHeader = styled.div`
	background-color: var(--color-stone);
	color: var(--color-graphite-dark);
	padding: 0.75rem 0.5rem;
	text-align: center;
	font-weight: 600;
	font-size: 0.8rem;
	text-transform: uppercase;
`;

const WeekDayNumber = styled.div`
	color: var(--color-graphite-dark);
	font-weight: 500;
	font-size: 0.9rem;
	margin-bottom: 0.25rem;
`;

const Event = styled.div`
	background-color: ${props => {
		switch (props.category) {
			case 'breakfast': return '#F59E0B'; // Orange
			case 'lunch': return '#10B981'; // Green
			case 'dinner': return '#8B5CF6'; // Purple
			case 'snack': return '#EC4899'; // Pink
			case 'dessert': return '#F97316'; // Orange-500
			default: return '#6B7280'; // Gray
		}
	}};
	color: white;
	padding: 0.25rem 0.5rem;
	margin-bottom: 0.25rem;
	border-radius: 0.25rem;
	font-size: 0.7rem;
	font-weight: 500;
	cursor: pointer;
	transition: opacity 0.2s ease;

	&:hover {
		opacity: 0.8;
	}
`;

const EventTitle = styled.div`
	font-weight: 600;
	margin-bottom: 0.1rem;
`;

const EventTime = styled.div`
	font-size: 0.6rem;
	opacity: 0.9;
`;

const MoreEvents = styled.div`
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
	events
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
					const dayEvents = events[dayNumber] || [];
					const showMore = dayEvents.length > 3;
					const displayEvents = dayEvents.slice(0, 3);
					const hasMeals = dayEvents.length > 0 && isCurrentMonthDay;
					
					return (
						<WeekDayCell 
							key={index}
							className={isToday ? 'current-day' : ''}
							$hasMeals={hasMeals}
							onClick={() => handleDayClick(day, dayEvents, isCurrentMonthDay)}
						>
							<WeekDayNumber>{dayNumber}</WeekDayNumber>
							{displayEvents.map((event, eventIndex) => (
								<Event key={eventIndex} category={event.category}>
									<EventTitle>{event.title}</EventTitle>
									<EventTime>{event.time}</EventTime>
								</Event>
							))}
							{showMore && (
								<MoreEvents>+{dayEvents.length - 3} more</MoreEvents>
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