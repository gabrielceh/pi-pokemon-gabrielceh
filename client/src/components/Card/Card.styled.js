import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Name = styled.h3`
	font-size: ${({ theme }) => theme.fontSize.xl_2};
	color: ${({ theme }) => theme.colors.darkBlue['400']};
	width: 50%;
	transition: color 0.3s ease-in-out, text-decoration 0.3s ease-in-out;

	&:hover {
		text-decoration: ${({ theme }) => `3px underline ${theme.colors.darkBlue['200']} wavy`};
	}
`;

export const CardContainer = styled.div`
	cursor: pointer;
	position: relative;
	width: 90%;
	height: 100px;
	margin: 0 auto;
	padding: 1rem 2rem;
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['200']}`};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 1rem;

	transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;

	&:hover {
		background-color: ${({ theme, type }) => theme.pokemonColors[type].light};
		border: ${({ theme, type }) => `2px solid ${theme.pokemonColors[type].medium}`};
	}

	&:hover ${Name} {
		color: ${({ theme, type }) => theme.pokemonColors[type].dark};
	}
`;

export const PokemonInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const LinkStyled = styled(Link)`
	text-decoration: none;
`;

export const TypesSection = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
`;

export const TypeImg = styled.img`
	width: 30px;
	height: auto;
`;

export const UserSpan = styled.span`
	color: ${({ theme }) => theme.colors.slate['300']};
`;
