/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import unknownPokemon from '../../assets/img/pokemon-unknown.png';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '../Icons/DeleteICon';
import EditIcon from '../Icons/EditIcon';
import { typesIcons } from '../../utils/pokemonTypesImages';
import { ROUTES_NAMES } from '../../utils/routes_name';
import {
	CardMobCont,
	ImgCard,
	ImgTypes,
	TypesSection,
	Name,
	UserContainer,
	UserSpan,
} from '../Card/CardMobile.styled';
import {} from '../Card/Card.styled';
import { ButtonCard } from '../../styled/Button.styled';

function CardsMobile({ pokemon, handleClick, handleEdit, handleOpenModalDetete }) {
	let { id, name, image, Types } = pokemon;
	const imagePk = image || unknownPokemon;

	const userPokemon = pokemon?.Users ? pokemon.Users[0] : null;
	const user = useSelector((state) => state.user);
	const location = useLocation();

	return (
		<CardMobCont
			type={Types[0].name}
			className='animation-move-up'
			onClick={handleClick}>
			<div>
				<Name type={Types[0].name}>{`#${id} ${name.toUpperCase()}`}</Name>
				<ImgCard
					type={Types[0].name}
					src={imagePk}
					alt={name}
				/>

				<TypesSection>
					{Types.length &&
						Types.map((type) => (
							<ImgTypes
								key={type.id}
								src={typesIcons(type.name)}
								alt={type.name}
							/>
						))}
				</TypesSection>
			</div>

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
		</CardMobCont>
	);
}

export default CardsMobile;
