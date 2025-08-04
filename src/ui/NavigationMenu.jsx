import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaBarsProgress , FaCalendarDays, FaBasketShopping } from 'react-icons/fa6';
import { useSidebar } from '../context/SidebarContext';

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0;
	list-style: none;
	gap: 0.25rem;
`;

const NavItem = styled.li``;

const StyledNavLink = styled(NavLink)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 500;
	padding: 0.5rem 0.25rem;
	border-radius: 0.5rem;
	color: var(--color-graphite);
	text-decoration: none;
	transition:
		background-color 0.2s ease,
		color 0.2s ease;

	svg {
		font-size: 1.25rem;
	}

	&:hover {
		background-color: var(--color-stone);
		color: white;
	}

	&.active {
		background-color: var(--color-desert-light);
		color: white;
		pointer-events: none;
	}
`;

export function NavigationMenu() {
	const { closeSidebar } = useSidebar();

	const handleNavClick = () => {
		// Close sidebar on mobile when a navigation link is clicked
		closeSidebar();
	};

	return (
		<NavList>
			<NavItem>
				<StyledNavLink to="/" end onClick={handleNavClick}>
					<FaBarsProgress  />
					Dashboard
				</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavLink to="/menu" onClick={handleNavClick}>
					<FaCalendarDays />
					Menu
				</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavLink to="/shopping-list" onClick={handleNavClick}>
					<FaBasketShopping />
					Shopping list
				</StyledNavLink>
			</NavItem>
		</NavList>
	);
}
