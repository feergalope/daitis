import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
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

export function Home() {
	return (
		<HomeContainer>
			<Title>Welcome to Daitis</Title>
			<Paragraph>Your personal task and schedule management app.</Paragraph>
		</HomeContainer>
	);
} 