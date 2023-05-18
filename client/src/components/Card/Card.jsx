/* eslint-disable react/prop-types */

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES_NAMES } from '../../utils/routes_name';
import { useModal } from '../../hooks/useModal';
import { typesIcons } from '../../utils/pokemonTypesImages';
import unknownPokemon from '../../assets/img/pokemon-unknown.png';
import {
	CardContainer,
	LinkStyled,
	Name,
	PokemonInfo,
	TypeImg,
	TypesSection,
	UserContainer,
	UserSpan,
} from './Card.styled';
import DeleteIcon from '../Icons/DeleteICon';
import EditIcon from '../Icons/EditIcon';
import ImageCard from './ImageCard';
import ModalDelete from '../EditDeleteMenu/ModalDelete';
import { deleteUserPokemon } from '../../redux/actions/pokemonUser.action';
import { ButtonCard } from '../../styled/Button.styled';

function Card({ pokemon = {}, onClose = null }) {
	let { id, name, image, Types } = pokemon;
	const [isOpenDelete, openModalDelete, closeModalDelete] = useModal();

	const imagePk = image || unknownPokemon;

	const location = useLocation();
	const [isOpenImg, openImg, closeImg] = useModal();
	const userPokemon = pokemon?.Users ? pokemon.Users[0] : null;
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleMouseEnter = () => {
		openImg();
	};
	const handleMouseLeave = () => {
		closeImg();
	};

	const handleClick = () => {
		if (onClose) {
			onClose();
		}
		navigate(`${ROUTES_NAMES.DETAIL}/${id}`);
	};

	const handleDelete = (event) => {
		event.preventDefault();
		dispatch(deleteUserPokemon(id));
	};

	const handleEdit = (event) => {
		event.preventDefault();
		event.stopPropagation();

		navigate(`${ROUTES_NAMES.EDIT}/${id}`);
	};

	const handleOpenModalDetete = (event) => {
		event.preventDefault();
		event.stopPropagation();

		openModalDelete();
	};

	return (
		<>
			{pokemon.id && (
				<CardContainer
					type={Types[0].name}
					className='animation-move-up'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
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
						</TypesSection>
						{isOpenImg && (
							<ImageCard
								srcImg={imagePk}
								altImg={name}
								type={Types[0].name}
							/>
						)}
					</PokemonInfo>

					{userPokemon && (
						<UserContainer>
							<UserSpan>Created by {userPokemon.userName}</UserSpan>
							{location.pathname === ROUTES_NAMES.PROFILE &&
								userPokemon?.userName === user?.user.userName && (
									<div>
										<ButtonCard
											type={Types[0].name}
											onClick={handleOpenModalDetete}>
											<DeleteIcon />
										</ButtonCard>
										<ButtonCard
											type={Types[0].name}
											onClick={handleEdit}>
											<EditIcon />
										</ButtonCard>
									</div>
								)}
						</UserContainer>
					)}
				</CardContainer>
			)}

			{isOpenDelete && (
				<ModalDelete
					closeModal={closeModalDelete}
					onAccept={handleDelete}
					pokemonName={name}
					pokemonId={id}
				/>
			)}
		</>
	);
}

export default Card;
