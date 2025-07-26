import styled from 'styled-components';

const MainStyled = styled.main`
	flex: 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	font-size: 1.875rem;
	font-weight: bold;
	margin-bottom: 1rem;
`;

const Paragraph = styled.p`
	font-size: 1.125rem;
`;

export function Main() {
	return (
		<MainStyled>
			<Title>Welcome to the App</Title>
			<Paragraph>
				This is a simple application layout using styled-components for styling. You can navigate through the app using
				the sidebar on the left.
			</Paragraph>
		</MainStyled>
	);
}
