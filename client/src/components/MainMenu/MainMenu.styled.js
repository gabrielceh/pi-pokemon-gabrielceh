import styled from 'styled-components';

export const MenuBar = styled.nav`
	width: 100%;
	position: fixed;
	bottom: 0;
	padding: 1rem;
	border-top: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};

	@media (${({ theme }) => theme.screenSize.tablet}) {
		width: 15%;
		max-width: 120px;
		min-width: 100px;
		position: relative;
		top: 0;
		border-top: none;
		border-right: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};
	}
`;
