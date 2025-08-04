import styled from 'styled-components';
import { Meal } from '../Meal';

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
`;

const ModalContent = styled.div`
	background-color: var(--color-milk-light);
	border-radius: 0.5rem;
	padding: 0.5rem;
	max-width: 600px;
	width: 90%;
	max-height: 80vh;
	overflow-y: auto;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.25rem;
	padding-bottom: 0.25rem;
`;

const ModalTitle = styled.div`
	color: var(--color-graphite-dark);
	font-weight: 500;
	font-size: 0.9rem;
	margin-bottom: 0.25rem;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	font-size: 0.9rem;
	color: var(--color-graphite-dark);
	cursor: pointer;
	padding: 0.25rem;
	border-radius: 0.25rem;
	transition: background-color 0.2s;

	&:hover {
		background-color: var(--color-stone);
	}
`;

const NoMealsMessage = styled.div`
	text-align: center;
	color: var(--color-stone-dark);
	font-style: italic;
	padding: 0.5rem;
	font-size: 0.7rem;
`;

export function DayModal({ isOpen, onClose, selectedDate, meals }) {
	if (!isOpen) return null;

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<ModalTitle>{formatDate(selectedDate)}</ModalTitle>
					<CloseButton onClick={onClose}>&times;</CloseButton>
				</ModalHeader>

				{meals && meals.length > 0 ? (
					<div>
						{meals.map((meal, index) => (
							<Meal key={index} meal={meal} size="compact" />
						))}
					</div>
				) : (
					<NoMealsMessage>No meals planned for this day</NoMealsMessage>
				)}
			</ModalContent>
		</ModalOverlay>
	);
} 