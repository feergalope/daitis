import styled from 'styled-components';

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



const MealItem = styled.div`
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
	transition: opacity 0.2s ease;
`;

const MealName = styled.div`
	font-weight: 600;
	margin-bottom: 0.1rem;
`;

const MealTime = styled.div`
	font-size: 0.6rem;
	opacity: 0.9;
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
							<MealItem key={index} category={meal.category}>
								<MealName>{meal.title}</MealName>
								<MealTime>{meal.time}</MealTime>
							</MealItem>
						))}
					</div>
				) : (
					<NoMealsMessage>No meals planned for this day</NoMealsMessage>
				)}
			</ModalContent>
		</ModalOverlay>
	);
} 