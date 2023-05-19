import styled from 'styled-components';

export const ContDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1rem;
`;

export const ContButtons = styled.section``;

export const ButtonOrder = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: none;
	padding: 0.2rem 0.4rem;
	border-radius: 10px;
	transition: background-color 0.3s ease-in-out;

	&:hover {
		background-color: ${({ theme }) => `${theme.colors.slate['500']}33`};
	}

	& svg {
		width: 28px;
		height: auto;
		stroke: ${({ theme }) => theme.text};
		transition: stroke 0.3s ease-in-out;
	}

	&:hover svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['400']};
	}
`;

export const LabelGroup = styled.span`
	font-size: ${({ theme }) => theme.fontSize.xs};
	color: ${({ theme }) => theme.colors.slate['400']};
	letter-spacing: 0.15rem;
`;

export const ButtonGroup = styled.div`
	padding: 0.3rem 0.5rem;
	border-radius: 5px;
	border: ${({ theme }) => `1px solid ${theme.colors.darkBlue['200']}`};
`;
