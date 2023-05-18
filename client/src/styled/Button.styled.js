import styled from 'styled-components';

export const ButtonForm = styled.button`
	cursor: pointer;
	background-color: transparent;
	outline: none;
	border: none;
	border-radius: 5px;
	font-size: ${({ theme }) => theme.fontSize.lg};
	font-weight: 700;
	padding: 0.3rem 1rem;
	transition: scale 0.05 ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;

	&:active {
		scale: 0.9;
	}

	&.edit {
		border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['500']}`};
		color: ${({ theme }) => theme.colors.darkBlue['500']};
		transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

		&:hover {
			background-color: ${({ theme }) => theme.colors.darkBlue['500']};
			color: ${({ theme }) => theme.colors.darkBlue['50']};
		}
	}
	&.create {
		border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['400']}`};
		color: ${({ theme }) => theme.colors.darkBlue['400']};
		transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

		&:hover {
			background-color: ${({ theme }) => theme.colors.darkBlue['400']};
			color: ${({ theme }) => theme.colors.darkBlue['50']};
		}
	}

	&.search {
		border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};
		color: ${({ theme }) => theme.colors.darkBlue['300']};
		transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

		&:hover {
			background-color: ${({ theme }) => theme.colors.darkBlue['300']};
			color: ${({ theme }) => theme.colors.darkBlue['50']};
		}
	}

	&.login {
		border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['500']}`};
		color: ${({ theme }) => theme.colors.darkBlue['500']};
		transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

		&:hover {
			background-color: ${({ theme }) => theme.colors.darkBlue['500']};
			color: ${({ theme }) => theme.colors.darkBlue['50']};
		}
	}

	&:disabled {
		background-color: ${({ theme }) => theme.colors.slate['400']};
		color: ${({ theme }) => theme.colors.slate['200']};
	}

	&:disabled:hover {
		background-color: ${({ theme }) => theme.colors.slate['600']};
		color: ${({ theme }) => theme.colors.slate['100']};
	}
`;

export const ButtonMenu = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: none;

	& svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['400']};
		transition: stroke 0.3s ease-in-out;
	}

	&:hover svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['600']};
	}
`;

export const ButtonCard = styled.button`
	cursor: pointer;
	border: none;
	background-color: transparent;

	& svg {
		transition: stroke 0.3s ease-in-out;
	}
	&:hover svg {
		stroke: ${({ theme, type }) => theme.pokemonColors[type].medium};
	}
`;
