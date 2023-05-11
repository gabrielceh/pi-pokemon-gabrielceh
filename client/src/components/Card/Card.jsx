/* eslint-disable react/prop-types */

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
				<>
					<h3>{name}</h3>

					<ul>
						TYPES:
						{Types.length && Types.map((type) => <li key={type.id}>{type.name}</li>)}
					</ul>

					{user && <p>USER: {user.userName}</p>}
				</>
			)}
		</div>
	);
}

export default Card;
