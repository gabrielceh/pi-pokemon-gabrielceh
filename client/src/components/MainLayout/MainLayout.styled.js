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

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
`;

export const MainHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 120px;
	padding: 3rem 2rem;
	margin: 0 auto;

	& svg {
		width: 200px;
		height: 100px;
		transition: fill 0.3s ease-in-out;
		fill: ${({ theme, darkMode }) =>
			darkMode === 'light' ? theme.colors.darkBlue['800'] : theme.colors.darkBlue['200']};
	}

	@media ${({ theme }) => theme.screenSize.tablet} {
		padding-left: 100px;
		padding-bottom: 4rem;
	}
`;
