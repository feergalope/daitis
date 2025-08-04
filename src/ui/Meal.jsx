import React from 'react';
import styled from 'styled-components';

const MealContainer = styled.div`
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
	border-radius: 0.25rem;
	font-weight: 500;
	cursor: pointer;
	transition: opacity 0.2s ease;
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* Size variants */
	${props => {
		switch (props.size) {
			case 'compact':
				return `
					padding: 0.25rem 0.5rem;
					margin-bottom: 0.25rem;
					font-size: 0.7rem;
				`;
			case 'expanded':
				return `
					padding: 0.5rem 0.75rem;
					margin-bottom: 0.5rem;
					font-size: 0.8rem;
					border-radius: 0.5rem;
				`;
			default:
				return `
					padding: 0.25rem 0.5rem;
					margin-bottom: 0.25rem;
					font-size: 0.7rem;
				`;
		}
	}}

	&:hover {
		opacity: 0.8;
	}
`;

const MealTitle = styled.div`
	font-weight: 600;
	${props => props.size === 'expanded' ? 'margin-bottom: 0.1rem;' : ''}
`;

const MealTime = styled.div`
	opacity: 0.9;
	${props => props.size === 'expanded' ? 'font-size: 0.7rem;' : 'font-size: 0.6rem;'}
`;

export function Meal({ meal, size = 'compact' }) {
	return (
		<MealContainer category={meal.category} size={size}>
			<MealTitle size={size}>{meal.title}</MealTitle>
			<MealTime size={size}>{meal.time}</MealTime>
		</MealContainer>
	);
} 