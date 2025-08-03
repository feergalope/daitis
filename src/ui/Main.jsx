import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Menu } from './Menu';
import { ShoppingList } from './ShoppingList';

const MainStyled = styled.main`
	flex: 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	margin-bottom: 1rem;
`;

const Paragraph = styled.p`
	font-size: 1rem;
`;

export function Main() {
	return (
		<MainStyled>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/menu" element={<Menu />} />
				<Route path="/shopping-list" element={<ShoppingList />} />
			</Routes>
		</MainStyled>
	);
}
