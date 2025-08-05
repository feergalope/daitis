import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { mealService } from '../services/mealService';
import { Meal } from '../ui/Meal';

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	padding: 1rem;
	height: 100%;
`;

const DashboardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

const DashboardTitle = styled.h1`
	color: var(--color-graphite-dark);
	margin: 0;
	font-size: 1.8rem;
	font-weight: 600;
`;

const DashboardSubtitle = styled.p`
	color: var(--color-graphite);
	margin: 0;
	font-size: 1rem;
`;

const MenuButton = styled.button`
	background-color: var(--color-desert);
	color: white;
	border: none;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	font-size: 0.9rem;
	font-weight: 500;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: var(--color-desert-dark);
	}

	/* Mobile styles */
	@media (max-width: 768px) {
		padding: 0.75rem 1.25rem;
		font-size: 1rem;
	}
`;

const CardsGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	align-items: flex-start;

	/* Mobile styles */
	@media (max-width: 768px) {
		flex-direction: column;
		gap: 1rem;
	}
`;

const Card = styled.div`
	background: ${props => props.variant === 'stats' 
		? 'var(--color-milk-light)' 
		: 'var(--color-desert)'};
	color: ${props => props.variant === 'stats' 
		? 'var(--color-graphite-dark)'
		: 'var(--color-milk-light)'};
	border-radius: 1rem;
	padding: 1.5rem;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	display: flex;
	flex-direction: column;
	
	/* Size variants */
	${props => {
		switch (props.size) {
			case 'small':
				return `
					width: 150px;
					height: 300px;
					
					@media (max-width: 768px) {
						width: 100%;
						height: 150px;
					}
				`;
			case 'medium':
				return `
					width: 400px;
					height: 300px;
					
					@media (max-width: 768px) {
						width: 100%;
						height: 300px;
					}
				`;
			case 'large':
				return `
					width: 400px;
					height: 600px;
					
					@media (max-width: 768px) {
						width: 100%;
						height: 600px;
					}
				`;
			default:
				return `
					width: 150px;
					height: 150px;
					
					@media (max-width: 768px) {
						width: 100%;
						height: 150px;
					}
				`;
		}
	}}
`;

const CardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	padding-bottom: 0.75rem;
	border-bottom: 2px solid var(--color-stone);
`;

const CardTitle = styled.h2`
	color: inherit;
	margin: 0;
	font-size: 1.2rem;
	font-weight: 600;
`;

const CardBody = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const MealList = styled.div`
	display: flex;
	flex-direction: column;
`;

const NoMealsMessage = styled.div`
	text-align: center;
	color: var(--color-stone-dark);
	font-style: italic;
	padding: 1rem;
	font-size: 0.9rem;
`;

const TodayNumber = styled.div`
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.25rem;
`;

const TodayMonth = styled.div`
	font-size: 0.9rem;
	opacity: 0.9;
`;

export function Dashboard() {
	const [todayMeals, setTodayMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const today = new Date();
	const navigate = useNavigate();

	const formatDate = (date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const handleMenuClick = () => {
		navigate('/menu');
	};

	useEffect(() => {
		const loadTodayMeals = async () => {
			try {
				setIsLoading(true);
				const meals = await mealService.getMealsByDate(today);
				setTodayMeals(meals);
			} catch (error) {
				console.error('Error loading today\'s meals:', error);
				setTodayMeals([]);
			} finally {
				setIsLoading(false);
			}
		};

		loadTodayMeals();
	}, []);

	return (
		<DashboardContainer>
			<DashboardHeader>
				<div>
					<DashboardTitle>Dashboard</DashboardTitle>
					<DashboardSubtitle>Welcome to your meal planning dashboard</DashboardSubtitle>
				</div>
			</DashboardHeader>

			<CardsGrid>
				<Card size="small">
					<CardBody>
						<TodayNumber>{today.getDate()}</TodayNumber>
						<TodayMonth>{today.toLocaleDateString('es-ES', { month: 'long' })}</TodayMonth>
					</CardBody>
				</Card>
				<Card size="medium" variant="stats">
					<CardHeader>
						<CardTitle>Today's Meals</CardTitle>
						<MenuButton onClick={handleMenuClick}>
							Go to Menu
						</MenuButton>
					</CardHeader>
					<CardBody>
						<MealList>
							{isLoading ? (
								<NoMealsMessage>Loading today's meals...</NoMealsMessage>
													) : todayMeals.length > 0 ? (
							todayMeals.map((meal, index) => (
								<Meal key={meal.id || index} meal={meal} size="expanded" />
							))
						) : (
								<NoMealsMessage>No meals planned for today</NoMealsMessage>
							)}
						</MealList>
					</CardBody>
				</Card>
			</CardsGrid>
		</DashboardContainer>
	);
} 