import styled from 'styled-components';
import { FaLeaf, FaCalendarDays, FaBasketShopping } from 'react-icons/fa6';

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	padding: 0;
	list-style: none;
	gap: 0.25rem;
`;

const NavItem = styled.li``;

const StyledNavLink = styled.a`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 500;
	padding: 0.5rem 0.25rem;
	border-radius: 0.5rem;
	color: var(--color-truffle-dark);
	text-decoration: none;
	transition:
		background-color 0.2s ease,
		color 0.2s ease;

	svg {
		font-size: 1.25rem;
	}

	&:hover {
		background-color: var(--color-sage);
		color: white;
	}

	&.active {
		background-color: var(--color-sage-light);
		color: white;
	}
`;

export function NavigationMenu() {
	return (
		<NavList>
			<NavItem>
				<StyledNavLink href="#" className="active">
					<FaLeaf />
					Home
				</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavLink href="#">
					<FaCalendarDays />
					Menu
				</StyledNavLink>
			</NavItem>
			<NavItem>
				<StyledNavLink href="#">
					<FaBasketShopping />
					Shopping list
				</StyledNavLink>
			</NavItem>
		</NavList>
	);
}
