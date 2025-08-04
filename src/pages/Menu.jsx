import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar } from '../ui/calendar/Calendar';
import { useLoading } from '../context/LoadingContext';

const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 1rem;
`;

const CalendarSection = styled.div`
	flex: 1;
`;

export function Menu() {
	const [calendarType, setCalendarType] = useState('week');
	const { setLoading } = useLoading();

	const handleViewChange = (viewType) => {
		setCalendarType(viewType);
		setLoading(true);
		
		setTimeout(() => {
			setLoading(false);
		}, 500);
	};

	return (
		<MenuContainer>
			<CalendarSection>
				<Calendar viewType={calendarType} onViewChange={handleViewChange} />
			</CalendarSection>
		</MenuContainer>
	);
} 