import React from 'react';
import styled from 'styled-components';

const StyledNavLink = styled.span`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 500;
	transition: color 0.1s ease-in-out;

	&:hover {
		color: var(--color-graphite-dark);
		cursor: pointer;
	}
`;

export function NavElement({ action, children }) {
	return <StyledNavLink href={action}>{children}</StyledNavLink>;
}
