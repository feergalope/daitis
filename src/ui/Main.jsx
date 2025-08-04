import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Menu } from '../pages/Menu';
import { ShoppingList } from '../pages/ShoppingList';
import { useLoading } from '../context/LoadingContext';

const MainStyled = styled.main`
	flex: 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow-y: auto;
	min-height: 0;
`;

const LoadingOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	border-radius: 0.5rem;
`;

const LoadingGif = styled.div`
	width: 50px;
	height: 50px;
	background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDMuMzMzMzNDMTEuNzE2IDMuMzMzMzMgNC42NjY2NyAxMC4zODMzIDQuNjY2NjcgMTguNjY2N0M0LjY2NjY3IDI2Ljk1IDExLjcxNiAzNCAyMCAzNEMyOC4yODQgMzQgMzUuMzMzMyAyNi45NSAzNS4zMzMzIDE4LjY2NjdDMzUuMzMzMyAxMC4zODMzIDI4LjI4NCAzLjMzMzMzIDIwIDMuMzMzMzNaIiBzdHJva2U9InZhcigtLWNvbG9yLWRlc2VydC1jbGF5KSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	animation: spin 1s linear infinite;
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;

const Title = styled.h1`
	margin-bottom: 1rem;
`;

const Paragraph = styled.p`
	font-size: 1rem;
`;

export function Main() {
	const { isLoading } = useLoading();

	return (
		<MainStyled>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/menu" element={<Menu />} />
				<Route path="/shopping-list" element={<ShoppingList />} />
			</Routes>
			{isLoading && (
				<LoadingOverlay>
					<LoadingGif />
				</LoadingOverlay>
			)}
		</MainStyled>
	);
}
