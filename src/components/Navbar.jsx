import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';

const StyledHeader = styled.header`
	background-color: var(--color-sage-dark);
	color: var(--color-oyster-light);

	height: calc(100vh - 10px); /* 100% del viewport menos 5px arriba y 5px abajo */
	width: 10rem;
	margin: 5px;

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
