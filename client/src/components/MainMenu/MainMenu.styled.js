import styled from 'styled-components';

export const MenuBar = styled.nav`
	position: fixed;
	z-index: 5;
	background-color: ${({ theme }) => theme.body};
	width: 100%;
	bottom: 0;
	padding: 0.5rem 1rem;
	border-top: ${({ theme }) => `1px solid ${theme.colors.darkBlue['300']}`};

	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		width: fit-content;
		max-width: 75px;
		position: fixed;
		padding: 1rem;
		top: 0;
		border-top: none;
		border-right: ${({ theme }) => `1px solid ${theme.colors.darkBlue['300']}`};
	}
`;

export const ContMenu = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	position: relative;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1.5rem;
		min-height: 100vh;
	}
`;

export const ContSVG = styled.span`
	& svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['400']};
		transition: stroke 0.3s ease-in-out;
	}

	&:hover svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['600']};
	}
`;

export const ConfigMenu = styled.div`
	position: absolute;
	bottom: 150%;
	right: 0;
	background-color: ${({ theme, darkMode }) =>
		darkMode === 'light' ? theme.colors.slate['200'] : theme.colors.slate['800']};
	width: 120px;
	padding: 0.5rem;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1.2rem;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		position: relative;
		width: 100%;
	}
`;
