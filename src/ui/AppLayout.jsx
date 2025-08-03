import React from 'react';
import styled from 'styled-components';

const AppLayoutStyled = styled.div`
	background-color: var(--color-milk-light);
	color: var(--color-graphite-dark);
	display: flex;

	font-family: var(--font-family-sans-serif);
	line-height: 1.6;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	height: 100dvh;
	width: 100dvw;
	overflow: hidden;
`;

export function AppLayout({ children }) {
	return <AppLayoutStyled>{children}</AppLayoutStyled>;
}
