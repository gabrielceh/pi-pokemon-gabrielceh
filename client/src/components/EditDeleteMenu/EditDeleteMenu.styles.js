import styled from 'styled-components';

export const ContainerMenu = styled.div`
	position: relative;
`;

export const ButtonMenu = styled.button`
	cursor: pointer;
	width: 38px;
	height: 38px;
	padding: 1rem;
	border-radius: 50%;
	border: none;
	position: relative;
	background-color: transparent;

	& svg {
		position: absolute;
		top: 12%;
		left: 12%;
		width: 30px;
		height: 30px;
		transition: scale 0.3s ease-in-out;
	}

	&:hover svg {
		scale: 1.2;
	}
`;

export const MenuOptions = styled.nav`
	position: absolute;
	z-index: 1;
	bottom: -200%;
	left: -50%;
	display: grid;
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['200']}`};
	border-radius: 5px;
	background-color: ${({ theme }) => theme.body};
`;

export const MenuItems = styled.div`
	padding: 0.5rem 1rem;

	&:hover {
		background-color: ${({ theme }) => theme.colors.darkBlue['300']};
		color: ${({ theme }) => theme.colors.darkBlue['50']};
	}
`;
