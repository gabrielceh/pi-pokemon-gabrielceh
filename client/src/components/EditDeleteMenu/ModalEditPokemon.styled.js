import styled from 'styled-components';

export const Container = styled.div`
	background-color: ${({ theme }) => theme.colors.darkBlue['100']};
	padding: 2rem;
	border-radius: 10px;
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};
	position: relative;
	min-width: 350px;
	width: 100%;
	max-width: 600px;
`;

export const Titile = styled.h2`
	color: ${({ theme }) => theme.colors.darkBlue['700']};

	font-size: ${({ theme }) => theme.fontSize.xl_2};
	text-align: center;
	margin-bottom: 1rem;
`;

export const ButtonClose = styled.button`
	cursor: pointer;
	padding: 0;
	position: absolute;
	right: 2%;
	top: 2%;
	border: none;
	background-color: transparent;

	& svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['900']};
		fill: white;
		border-radius: 10px;
		transition: stroke 0.3s ease-in-out;
		width: 2rem;
		height: 2rem;
	}

	&:hover svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['500']};
	}
`;
