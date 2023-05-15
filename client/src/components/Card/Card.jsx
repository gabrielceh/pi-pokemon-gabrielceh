/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '../../utils/routes_name';
import { useSelector } from 'react-redux';
import EditDeleteMenu from '../EditDeleteMenu/EditDeleteMenu';
import { useLocation } from 'react-router-dom';

function Card({ pokemon = {} }) {
	let {
		id,
		name,
		image,

		Types,
	} = pokemon;

	const location = useLocation();
	const userPokemon = pokemon?.Users ? pokemon.Users[0] : null;
	const user = useSelector((state) => state.user);

	return (
		<div>
			{pokemon.id && (
				<div>
					<Link to={`${ROUTES_NAMES.DETAIL}/${id}`}>
						<h3>{name}</h3>
					</Link>

					<ul>
						TYPES:
						{Types.length && Types.map((type) => <li key={type.id}>{type.name}</li>)}
					</ul>

					{userPokemon && <p>USER: {userPokemon.userName}</p>}
					{location.pathname === ROUTES_NAMES.PROFILE &&
						userPokemon?.userName === user?.user.userName && (
							<EditDeleteMenu
								pokemonId={id}
								pokemonName={name}
							/>
						)}
				</div>
			)}
		</div>
	);
}

export default Card;
