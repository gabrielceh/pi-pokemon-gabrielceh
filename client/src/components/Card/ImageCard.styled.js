import styled from 'styled-components';

export const ImageContainer = styled.div`
	width: 150px;
	height: 160px;
	padding: 1rem;
	overflow: hidden;
	background-color: ${({ theme }) => theme.body};
	border-radius: 10px;
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['100']}`};
	position: absolute;
	top: -90%;
	left: 50%;
	transform: translateX(-50%);
`;

export const Img = styled.img`
	width: 100%;
`;
