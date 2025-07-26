import React from 'react';
import styled from 'styled-components';

const Brand = styled.span`
	height: 5rem;
	display: block;
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
`;

export function Logo() {
	return <Brand>Daitis</Brand>;
}
