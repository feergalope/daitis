import React from 'react';
import styled from 'styled-components';

const ShoppingListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	text-align: center;
`;

const Title = styled.h1`
	color: var(--color-graphite-dark);
	margin-bottom: 1rem;
`;

const Paragraph = styled.p`
	color: var(--color-graphite);
	font-size: 1.1rem;
`;

export function ShoppingList() {
	return (
		<ShoppingListContainer>
			<Title>Shopping List</Title>
			<Paragraph>Your shopping list will appear here.</Paragraph>
		</ShoppingListContainer>
	);
} 