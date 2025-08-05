import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Meal } from '../Meal';
import { MealModal } from '../MealModal';

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
	max-width: 600px;
	width: 100%;
	max-height: 80vh;
	overflow-y: auto;
	position: relative;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
	background-color: var(--color-desert);
	color: white;
	padding: 1.5rem;
	border-radius: 1rem 1rem 0 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ModalTitle = styled.h2`
	margin: 0;
	font-size: 1.3rem;
	font-weight: 600;
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
`;

const MealList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export function DayModal({ isOpen, onClose, selectedDate, meals }) {
	const [isMealModalOpen, setIsMealModalOpen] = useState(false);
	const [selectedMeal, setSelectedMeal] = useState(null);

	if (!isOpen) return null;

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleMealClick = (meal) => {
		setSelectedMeal(meal);
		setIsMealModalOpen(true);
	};

	const closeMealModal = () => {
		setIsMealModalOpen(false);
		setSelectedMeal(null);
	};

	const formatDate = (date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	return (
		<ModalOverlay onClick={handleOverlayClick}>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>{selectedDate ? formatDate(selectedDate) : 'Day Details'}</ModalTitle>
					<CloseButton onClick={onClose}>
						<FaTimes />
					</CloseButton>
				</ModalHeader>
				
				<ModalBody>
					<MealList>
						{meals && meals.length > 0 ? (
							meals.map((meal, index) => (
								<Meal 
									key={meal.id || index} 
									meal={meal} 
									size="expanded" 
									onClick={handleMealClick}
								/>
							))
						) : (
							<div>No meals for this day</div>
						)}
					</MealList>
				</ModalBody>
			</ModalContent>

			<MealModal 
				isOpen={isMealModalOpen}
				onClose={closeMealModal}
				meal={selectedMeal}
			/>
		</ModalOverlay>
	);
} 