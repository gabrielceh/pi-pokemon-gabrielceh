import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 1rem;
`;

export const LabelGroup = styled.span`
	font-size: ${({ theme }) => theme.fontSize.xs};
	color: ${({ theme }) => theme.colors.slate['400']};
	letter-spacing: 0.15rem;
`;

export const Select = styled.select`
	padding: 0.2rem 1rem;
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};
	border-radius: 5px;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border 0.3s ease-in-out;

	&:focus {
		outline: none;
		border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['600']}`};
	}
`;
