import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	padding: 1rem;
`;

const ModalContent = styled.div`
	background-color: var(--color-milk-light);
	border-radius: 1rem;
	max-width: 800px;
	width: 100%;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
	background-color: ${props => {
		switch (props.category) {
			case 'breakfast': return '#F59E0B';
			case 'lunch': return '#10B981';
			case 'dinner': return '#8B5CF6';
			case 'snack': return '#EC4899';
			case 'dessert': return '#F97316';
			default: return '#6B7280';
		}
	}};
	color: white;
	padding: 1.5rem;
	border-radius: 1rem 1rem 0 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderInfo = styled.div`
	flex: 1;
`;

const MealTitle = styled.h2`
	margin: 0 0 0.5rem 0;
	font-size: 1.5rem;
	font-weight: 600;
`;

const MealCategory = styled.div`
	opacity: 0.9;
	font-size: 0.9rem;
	text-transform: capitalize;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 0.5rem;
	border-radius: 0.25rem;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const ModalBody = styled.div`
	padding: 1.5rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;

	/* Mobile styles */
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
`;

const Section = styled.div`
	display: flex;
	flex-direction: column;
`;

const SectionTitle = styled.h3`
	color: var(--color-graphite-dark);
	margin: 0 0 1rem 0;
	font-size: 1.2rem;
	font-weight: 600;
	border-bottom: 2px solid var(--color-stone);
	padding-bottom: 0.5rem;
`;

const IngredientsList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const IngredientItem = styled.li`
	color: var(--color-graphite-dark);
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
	font-size: 0.9rem;
	display: flex;
	align-items: center;

	&:before {
		content: "•";
		color: var(--color-desert);
		font-weight: bold;
		margin-right: 0.5rem;
		font-size: 1.2rem;
	}
`;

const StepsList = styled.ol`
	padding-left: 1.5rem;
	margin: 0;
`;

const StepItem = styled.div`
	color: var(--color-graphite-dark);
	padding: 0.75rem 0;
	font-size: 0.9rem;
	line-height: 1.5;
	border-bottom: 1px solid var(--color-stone);
	
	&:last-child {
		border-bottom: none;
	}
`;

const StepNumber = styled.span`
	background-color: var(--color-desert);
	color: white;
	border-radius: 50%;
	width: 1.5rem;
	height: 1.5rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 0.8rem;
	font-weight: 600;
	margin-right: 0.75rem;
`;

export function MealModal({ isOpen, onClose, meal }) {
	if (!isOpen || !meal) return null;

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<ModalOverlay onClick={handleOverlayClick}>
			<ModalContent>
				<ModalHeader category={meal.category}>
					<HeaderInfo>
						<MealTitle>{meal.title}</MealTitle>
						<MealCategory>{meal.category}</MealCategory>
					</HeaderInfo>
					<CloseButton onClick={onClose}>
						<FaTimes />
					</CloseButton>
				</ModalHeader>
				
				<ModalBody>
					<Section>
						<SectionTitle>Ingredients</SectionTitle>
						<IngredientsList>
							{meal.ingredients ? meal.ingredients.map((ingredient, index) => (
								<IngredientItem key={index}>{ingredient}</IngredientItem>
							)) : (
								<IngredientItem>No ingredients available</IngredientItem>
							)}
						</IngredientsList>
					</Section>
					
					<Section>
						<SectionTitle>Instructions</SectionTitle>
						<StepsList>
							{meal.instructions ? meal.instructions.map((step, index) => (
								<StepItem key={index}>
									<StepNumber>{index + 1}</StepNumber>
									{step}
								</StepItem>
							)) : (
								<StepItem>
									<StepNumber>1</StepNumber>
									No instructions available
								</StepItem>
							)}
						</StepsList>
					</Section>
				</ModalBody>
			</ModalContent>
		</ModalOverlay>
	);
} 