import styled from 'styled-components';

export const OptionsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

export const SelectsCont = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1rem;
`;
