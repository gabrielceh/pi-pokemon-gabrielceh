import styled from 'styled-components';

export const Modalstyled = styled.div`
	min-height: 100vh;
	min-width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: ${({ theme }) => `${theme.colors.darkBlue[800]}cc`};
	backdrop-filter: blur(5px);
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
`;
