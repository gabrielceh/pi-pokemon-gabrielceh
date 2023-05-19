import styled from 'styled-components';

export const LoaderCont = styled.div`
	width: 100%;
	min-height: 65vh;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2.5rem;

	& img {
		width: 250px;
		height: auto;
	}
`;

export const LoadingSection = styled.div`
	width: 100%;
	padding: 2rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
