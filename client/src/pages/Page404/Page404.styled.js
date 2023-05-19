import styled from 'styled-components';

export const Page404Cont = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`;

export const Title = styled.h1`
	font-size: ${({ theme }) => theme.fontSize.xl_4};
	@media (${({ theme }) => theme.screenSize.tablet}) {
		font-size: ${({ theme }) => theme.fontSize.xl_8};
	}
`;

export const Span = styled.span`
	font-size: ${({ theme }) => theme.fontSize.xl};
	@media (${({ theme }) => theme.screenSize.tablet}) {
		font-size: ${({ theme }) => theme.fontSize.xl_3};
	}
`;

export const Img404 = styled.img`
	width: 90%;
	height: auto;
	min-width: 300px;
	max-width: 700px;
	border-radius: 20px;
`;
