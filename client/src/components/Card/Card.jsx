/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '../../utils/routes_name';

function Card({ pokemon = {} }) {
	let {
		id,
		name,
		image,

		Types,
	} = pokemon;
	const user = pokemon?.Users ? pokemon.Users[0] : null;

	return (
		<div>
			{pokemon.id && (
				<Link to={`${ROUTES_NAMES.DETAIL}/${id}`}>
					<h3>{name}</h3>

					<ul>
						TYPES:
						{Types.length && Types.map((type) => <li key={type.id}>{type.name}</li>)}
					</ul>

					{user && <p>USER: {user.userName}</p>}
				</Link>
			)}
		</div>
	);
}

export default Card;
