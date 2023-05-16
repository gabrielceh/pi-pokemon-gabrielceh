import styled from 'styled-components';

export const Main = styled.main`
	width: 100%;
	min-height: 100vh;

	display: flex;
	flex-direction: column;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		flex-direction: row;
	}
`;
