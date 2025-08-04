import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
`;

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const MonthYear = styled.h2`
	color: var(--color-graphite-dark);
	font-size: 1.5rem;
	font-weight: 600;
	margin-left: 1rem;
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const ViewButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: ${props => props.$active ? 'var(--color-desert)' : 'var(--color-milk-light)'};
	color: ${props => props.$active ? 'white' : 'var(--color-graphite)'};
	border: 1px solid var(--color-stone);
	border-radius: 0.25rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	font-size: 0.8rem;

	&:hover {
		background-color: ${props => props.$active ? 'var(--color-desert-dark)' : 'var(--color-stone)'};
	}
`;

const NavigationButtons = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const NavButton = styled.button`
	background: none;
	border: none;
	color: var(--color-graphite-dark);
	font-size: 1.2rem;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	border-radius: 0.25rem;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: var(--color-stone);
	}
`;

export function CalendarHeader({
	title,
	viewType,
	onViewChange,
	onNavigate,
	onGoToToday
}) {
	return (
		<HeaderContainer>
			<HeaderLeft>
				<NavigationButtons>
					<NavButton onClick={() => onNavigate(-1)}>‹</NavButton>
					<NavButton onClick={onGoToToday}>Today</NavButton>
					<NavButton onClick={() => onNavigate(1)}>›</NavButton>
				</NavigationButtons>
				<MonthYear>{title}</MonthYear>
			</HeaderLeft>
			<HeaderRight>
				<ButtonGroup>		
					<ViewButton 
						type="button"
						$active={viewType === 'week'}
						onClick={() => onViewChange('week')}
					>
						Week
					</ViewButton>
					<ViewButton 
						type="button"
						$active={viewType === 'month'}
						onClick={() => onViewChange('month')}
					>
						Month
					</ViewButton>
				</ButtonGroup>
				
			</HeaderRight>
		</HeaderContainer>
	);
} 