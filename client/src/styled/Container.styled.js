import styled from 'styled-components';

export const ContainerStyled = styled.div`
	width: 95%;
	margin: 0 auto;

	@media ${({ theme }) => theme.screenSize.laptop} {
		& {
			width: 85%;
			max-width: 1440px;
		}
	}
`;

export const ContainerPage = styled.div`
	padding: 2rem;
	padding-bottom: 9rem;
	width: 100%;
	margin: 0 auto;

	&.detail {
		background-color: ${({ theme, type }) =>
			type === undefined ? theme.body : theme.pokemonColors[type].light};
	}

	@media ${({ theme }) => theme.screenSize.tablet} {
		padding-left: 100px;
		padding-bottom: 3rem;
	}
`;
