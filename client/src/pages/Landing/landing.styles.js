import styled from 'styled-components';

export const Div = styled.div`
	min-height: 90vh;
`;

export const Flex = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	gap: 2rem;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		flex-direction: row;
	}
`;

export const SectionTitle = styled.section`
	width: 80%;
	margin: 0 auto;
	/* background-color: ${({ theme }) => theme.colors.yellow['300']}; */
	padding: 2rem 2rem;
	border: ${({ theme }) => `3px solid ${theme.colors.yellow['300']}`};
	box-shadow: ${({ theme }) => `-5px 5px ${theme.colors.yellow['400']}`};

	& .link {
		padding: 0.5rem 1.5rem;
		border: ${({ theme }) => `2px solid ${theme.colors.yellow['200']}`};
		border-radius: 5px;
		text-decoration: none;
		color: ${({ theme }) => theme.colors.yellow['500']};
		font-weight: 800;
		transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border 0.3s ease-in-out;

		&:hover {
			color: ${({ theme }) => theme.colors.yellow['200']};
			border: ${({ theme }) => `2px solid ${theme.colors.yellow['500']}`};
			background-color: ${({ theme }) => theme.colors.yellow['500']};
		}
	}

	@media (${({ theme }) => theme.screenSize.tablet}) {
		width: 45%;
	}
`;

export const SectionImage = styled.section`
	& img {
		width: 100%;
		min-width: 320px;
		max-width: 600px;
		height: auto;
	}
`;

export const Title = styled.h1`
	font-size: ${({ theme }) => theme.fontSize.xl_2};
	margin-bottom: 1.5rem;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		font-size: ${({ theme }) => theme.fontSize.xl_4};
	}
`;
