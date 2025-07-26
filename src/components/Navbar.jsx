import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';

const StyledHeader = styled.header`
	background-color: var(--color-sage-dark);
	color: var(--color-oyster-light);

	height: calc(100dvh - 2rem); /* Viewport - margins */
	width: 12rem;
	margin: 1rem;

	margin-right: 10px;
	padding: 10px;

	border-radius: 1rem;
	overflow: hidden;
`;

export function Navbar() {
	return (
		<StyledHeader>
			<Logo />
			<NavigationMenu />
		</StyledHeader>
	);
}
