import styled from 'styled-components';

export const CardMobCont = styled.div`
	position: relative;
	width: 100%;
	max-height: 400px;
	min-height: 300px;
	padding: 2rem;
	margin: 0 auto;
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['200']}`};
	border-radius: 10px;
	border: ${({ theme, type }) => `2px solid ${theme.pokemonColors[type].medium}`};
	background-color: ${({ theme, type }) => theme.pokemonColors[type].light};
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 1rem;
`;

export const Name = styled.h3`
	position: relative;
	z-index: 1;
	font-size: ${({ theme }) => theme.fontSize.xl_2};
	color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	width: 50%;
`;

export const ImgCard = styled.img`
	width: 150px;
	height: 150px;
	position: absolute;
	bottom: 4%;
	right: 4%;
	z-index: 0;
	filter: ${({ theme, type }) => `drop-shadow(3px 3px 2px ${theme.pokemonColors[type].dark})`};
`;

export const TypesSection = styled.section`
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 2rem;
`;

export const ImgTypes = styled.img`
	position: relative;
	z-index: 1;
	width: 50px;
	height: 50px;
`;

export const UserContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

export const UserSpan = styled.span`
	color: ${({ theme }) => theme.colors.slate['500']};
`;
