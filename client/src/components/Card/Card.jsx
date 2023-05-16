/* eslint-disable react/prop-types */

import { ROUTES_NAMES } from '../../utils/routes_name';
import { useSelector } from 'react-redux';
import EditDeleteMenu from '../EditDeleteMenu/EditDeleteMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import ImageCard from './ImageCard';
import { typesIcons } from '../../utils/pokemonTypesImages';
import unknownPokemon from '../../assets/img/pokemon-unknown.png';
import {
	CardContainer,
	LinkStyled,
	Name,
	PokemonInfo,
	TypeImg,
	TypesSection,
	UserSpan,
} from './Card.styled';
import { useState } from 'react';

function Card({ pokemon = {}, onClose = null }) {
	let { id, name, image, Types } = pokemon;
	const [pos, setPos] = useState({});

	const handleMousePosition = (event) => {
		const viewport = window.innerWidth;

		if (event.clientX / viewport < 0.3) {
			setPos({
				posX: event.clientX,
			});
		}
	};

	const imagePk = image || unknownPokemon;

	const location = useLocation();
	const [isOpenImg, openImg, closeImg] = useModal();
	const userPokemon = pokemon?.Users ? pokemon.Users[0] : null;
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();

	const handleMouseEnter = () => {
		event.stopPropagation();
		openImg();
	};
	const handleMouseLeave = () => {
		event.stopPropagation();
		closeImg();
	};

	const handleClick = () => {
		if (onClose !== null) {
			onClose();
			navigate(`${ROUTES_NAMES.DETAIL}/${id}`);
		}
	};

	return (
		<>
			{pokemon.id && (
				<CardContainer
					type={Types[0].name}
					className='animation-move-up'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onMouseMove={handleMousePosition}
					onClick={handleClick}>
					<PokemonInfo>
						<LinkStyled to={`${ROUTES_NAMES.DETAIL}/${id}`}>
							<Name type={Types[0].name}>{name.toUpperCase()}</Name>
						</LinkStyled>

						<TypesSection>
							{Types.length &&
								Types.map((type) => (
									<TypeImg
										key={type.id}
										src={typesIcons(type.name)}
										alt={type.name}
									/>
								))}

							{location.pathname === ROUTES_NAMES.PROFILE &&
								userPokemon?.userName === user?.user.userName && (
									<EditDeleteMenu
										pokemonId={id}
										pokemonName={name}
									/>
								)}
						</TypesSection>
						{isOpenImg && (
							<ImageCard
								srcImg={imagePk}
								altImg={name}
								pos={pos}
							/>
						)}
					</PokemonInfo>

					{userPokemon && <UserSpan>Created by {userPokemon.userName}</UserSpan>}
				</CardContainer>
			)}
		</>
	);
}

export default Card;
