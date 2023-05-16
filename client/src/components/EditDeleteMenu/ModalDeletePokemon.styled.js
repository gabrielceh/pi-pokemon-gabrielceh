import styled from 'styled-components';

export const Container = styled.div`
	background-color: ${({ theme }) => theme.colors.darkBlue['50']};
	padding: 2rem;
	border-radius: 10px;
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
`;

export const Title = styled.h3`
	color: ${({ theme }) => theme.colors.darkBlue['500']};
	font-size: ${({ theme }) => theme.fontSize.xl};

	@media (${({ theme }) => theme.screenSize.laptop}) {
		font-size: ${({ theme }) => theme.fontSize.xl_2};
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 2rem;
`;

export const Button = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: none;
	border-radius: 5px;
	font-size: ${({ theme }) => theme.fontSize.lg};
	font-weight: 700;
	padding: 0.5rem 1rem;
	transition: background-color 0.3s ease-in-out, scale 0.05s ease-in-out;

	&.cancel {
		color: ${({ theme }) => theme.colors.emerald['700']};
		border: ${({ theme }) => `2px solid ${theme.colors.emerald['700']}`};

		&:hover {
			background-color: ${({ theme }) => theme.colors.emerald['200']};
		}
	}
	&.delete {
		color: ${({ theme }) => theme.colors.red['700']};
		border: ${({ theme }) => `2px solid ${theme.colors.red['700']}`};

		&:hover {
			background-color: ${({ theme }) => theme.colors.red['200']};
		}
	}

	&:active {
		scale: 0.9;
	}
`;
