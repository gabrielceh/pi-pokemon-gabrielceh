import styled from 'styled-components';

export const Container = styled.div`
	min-height: 600px;
	width: 90%;
	min-width: 300px;
	max-width: 800px;
	background-color: ${({ theme }) => theme.colors.darkBlue['800']};
	border-radius: 10px;
	position: relative;
	overflow: hidden;
	box-shadow: ${({ theme }) => `0px 0px 60px ${theme.colors.darkBlue['800']}`};
`;

export const ContainerTop = styled.div`
	width: 100%;
	border-bottom: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};
	display: flex;
	flex-direction: column;
	padding: 2rem;
	gap: 1rem;
`;

export const ButtonClose = styled.button`
	cursor: pointer;
	top: 3%;
	right: 3%;
	max-width: 100px;
	background-color: ${({ theme }) => theme.colors.darkBlue['500']};
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['400']}`};
	padding: 0.2rem 0.8rem;
	color: ${({ theme }) => theme.colors.darkBlue['100']};
	border-radius: 5px;
	transition: background-color 0.3s ease-in-out;

	align-self: flex-end;

	&:hover {
		background-color: ${({ theme }) => theme.colors.darkBlue['800']};
	}
`;

export const Result = styled.div`
	padding: 2rem;
	background-color: ${({ theme }) => theme.colors.darkBlue['900']};
	height: 430px;
	color: ${({ theme }) => theme.colors.slate['100']};
`;

export const ErrorSearch = styled.p`
	font-size: ${({ theme }) => theme.fontSize.xl_3};
	font-weight: 700;
	color: ${({ theme }) => theme.colors.red['400']};
`;
