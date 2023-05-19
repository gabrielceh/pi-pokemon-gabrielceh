import styled from 'styled-components';

export const PagContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
`;

export const BtnPag = styled.button`
	cursor: pointer;
	outline: none;
	background-color: transparent;
	color: ${({ theme }) => theme.colors.darkBlue['400']};
	border: ${({ theme }) => `1px solid ${theme.colors.darkBlue['400']}`};
	border-radius: 5px;
	padding: 0.2rem 0.6rem;
	font-size: ${({ theme }) => theme.fontSize.lg};
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, translate 0.3s ease-in-out;

	&:hover {
		background-color: ${({ theme }) => theme.colors.darkBlue['400']};
		color: ${({ theme }) => theme.colors.darkBlue['50']};
		translate: 0 -0.3rem;
	}

	& svg {
		width: 20px;
		height: 17px;
		stroke: ${({ theme }) => theme.colors.darkBlue['400']};
		transition: stroke 0.3s ease-in-out;
	}

	&:hover svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['50']};
	}

	&:disabled {
		border: ${({ theme }) => `1px solid ${theme.colors.slate['400']}`};
	}

	&:disabled:hover {
		background-color: ${({ theme }) => theme.colors.slate['400']};
		translate: 0;
	}

	&:disabled svg {
		stroke: ${({ theme }) => theme.colors.slate['400']};
	}

	&:disabled:hover svg {
		stroke: ${({ theme }) => theme.colors.slate['50']};
	}

	&.focus {
		background-color: ${({ theme }) => theme.colors.darkBlue['600']};
		color: ${({ theme }) => theme.colors.darkBlue['50']};
		translate: 0 -0.3rem;
	}
`;

export const ButtonsNumbers = styled.button`
	cursor: pointer;
	outline: none;
	background-color: transparent;
	color: ${({ theme }) => theme.colors.darkBlue['400']};
	border: ${({ theme }) => `1px solid ${theme.colors.darkBlue['400']}`};
	border-radius: 5px;
	padding: 0.2rem 0.6rem;
	font-size: ${({ theme }) => theme.fontSize.lg};
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, translate 0.3s ease-in-out;

	&:hover {
		background-color: ${({ theme }) => theme.colors.darkBlue['400']};
		color: ${({ theme }) => theme.colors.darkBlue['50']};
		translate: 0 -0.3rem;
	}
	/* 
	&:disabled {
		border: ${({ theme }) => `1px solid ${theme.colors.slate['400']}`};
	}

	&:disabled:hover {
		background-color: ${({ theme }) => theme.colors.slate['400']};
		translate: 0;
	} */

	&.focus {
		background-color: ${({ theme }) => theme.colors.darkBlue['600']};
		color: ${({ theme }) => theme.colors.darkBlue['50']};
		translate: 0 -0.3rem;
	}
`;
