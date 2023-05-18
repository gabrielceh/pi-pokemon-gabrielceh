import styled from 'styled-components';

export const ContainerDetail = styled.article`
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 3rem;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		max-width: 1280px;
		margin: 0 auto;
	}
`;

export const ImgContainer = styled.section`
	align-self: self-end;

	& img {
		width: 100%;
		min-width: 270px;
		max-width: 600px;
		height: auto;
		filter: ${({ theme, type }) => `drop-shadow(6px 6px 3px ${theme.pokemonColors[type].dark})`};
	}
`;

export const InfoSection = styled.section`
	/* align-self: flex-start; */
	color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	font-weight: 600;

	&::selection {
		color: ${({ theme, type }) => theme.pokemonColors[type].light};
		background-color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}
`;

export const PokemonName = styled.h1`
	font-size: ${({ theme }) => theme.fontSize.xl_3};
	letter-spacing: 0.2rem;
	font-weight: 800;
	@media (${({ theme }) => theme.screenSize.tablet}) {
		font-size: ${({ theme }) => theme.fontSize.xl_5};
	}
	&::selection {
		color: ${({ theme, type }) => theme.pokemonColors[type].light};
		background-color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}
`;

export const UserPok = styled.span`
	font-size: ${({ theme }) => theme.fontSize.xl};

	&::selection {
		color: ${({ theme, type }) => theme.pokemonColors[type].light};
		background-color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}

	@media (${({ theme }) => theme.screenSize.tablet}) {
		font-size: ${({ theme }) => theme.fontSize.xl_2};
	}
`;

export const DividerH = styled.div`
	width: 100%;
	height: 1px;
	margin: 1rem 0;
	background-color: ${({ theme, type }) => theme.pokemonColors[type].medium};
`;

export const Divider = styled.div`
	width: 100%;
	height: 1px;
	margin: 1rem 0;
	background-color: ${({ theme, type }) => theme.pokemonColors[type].medium};

	@media (${({ theme }) => theme.screenSize.tablet}) {
		height: 100%;
		min-height: 300px;
		width: 1px;
		margin: 0rem 1rem;
	}
`;

export const GridInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
`;

export const InfoArticle = styled.article`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem 0;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		display: block;
		width: 30%;
		align-self: flex-start;
	}
`;

export const LabelArticle = styled.p`
	font-size: ${({ theme }) => theme.fontSize.xl_2};
	letter-spacing: 0.2rem;
	font-weight: 700;

	&::selection {
		color: ${({ theme, type }) => theme.pokemonColors[type].light};
		background-color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}
`;

export const ImagesTypesCont = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 2rem;
`;

export const ImageTypeCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const ImageType = styled.img`
	width: 60px;
	@media (${({ theme }) => theme.screenSize.tablet}) {
		width: 70px;
	}
`;

export const TypeName = styled.p`
	color: ${({ theme, type }) => theme.pokemonColors[type].medium};
	font-weight: 500;

	&::selection {
		color: ${({ theme, type }) => theme.pokemonColors[type].light};
		background-color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}
`;

export const InfoLabel = styled.p`
	text-align: right;

	&::selection {
		color: ${({ theme, type }) => theme.pokemonColors[type].light};
		background-color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}

	& span::selection {
		color: ${({ theme, type }) => theme.pokemonColors[type].light};
		background-color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}

	@media (${({ theme }) => theme.screenSize.tablet}) {
		text-align: left;
	}
`;
