import React from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { useSidebar } from '../context/SidebarContext';

const SidebarContainer = styled.div`
	position: relative;
	z-index: 1000;
`;

const StyledHeader = styled.header`
	background-color: var(--color-stone-dark);
	color: var(--color-graphite-dark);
	height: calc(100dvh - 2rem);
	width: 12rem;
	margin: 1rem;
	margin-right: 10px;
	padding: 10px;
	border-radius: 1rem;
	overflow: hidden;

	/* Mobile styles */
	@media (max-width: 768px) {
		position: fixed;
		top: 0;
		left: ${props => props.isOpen ? '0' : '-100%'};
		width: 80vw;
		height: 100vh;
		margin: 0;
		border-radius: 0;
		transition: left 0.3s ease;
		z-index: 1001;
	}
`;

const MobileOverlay = styled.div`
	display: none;
	
	@media (max-width: 768px) {
		display: ${props => props.isOpen ? 'block' : 'none'};
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}
`;

const MobileToggleButton = styled.button`
	display: none;
	position: fixed;
	top: 1rem;
	left: 1rem;
	z-index: 1002;
	background-color: var(--color-stone-dark);
	color: white;
	border: none;
	border-radius: 0.5rem;
	padding: 0.75rem;
	font-size: 1.25rem;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: var(--color-desert);
	}

	@media (max-width: 768px) {
		display: ${props => props.isOpen ? 'none' : 'block'};
	}
`;

const CloseButton = styled.button`
	display: none;
	position: absolute;
	top: 1rem;
	right: 1rem;
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

	@media (max-width: 768px) {
		display: block;
	}
`;

export function Sidebar() {
	const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

	return (
		<SidebarContainer>
			<MobileToggleButton onClick={toggleSidebar} isOpen={isSidebarOpen}>
				<FaBars />
			</MobileToggleButton>
			
			<MobileOverlay isOpen={isSidebarOpen} onClick={closeSidebar} />
			
			<StyledHeader isOpen={isSidebarOpen}>
				<CloseButton onClick={closeSidebar}>
					<FaTimes />
				</CloseButton>
				<Logo />
				<NavigationMenu />
			</StyledHeader>
		</SidebarContainer>
	);
}
