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
