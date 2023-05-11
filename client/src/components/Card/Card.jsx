import React from 'react';
import { useSelector } from 'react-redux';

function Card({ pokemon = {} }) {
	const loading = useSelector((state) => state.loading);

	let {
		id,
		name,
		image,
		hp,
		attack,
		defense,
		special_attack,
		special_defense,
		speed,
		height,
		weight,
		Types,
	} = pokemon;
	const user = pokemon?.Users ? pokemon.Users[0] : null;
	height = height || 'unknown';
	weight = weight || 'unknown';
	return (
		<div>
			<>
				<h3>{name}</h3>

				<div>TYPES:</div>
				{Types.map((type) => (
					<p key={type.id}>{type.name}</p>
				))}

				<ul>
					<li>HP: {hp}</li>
					<li>ATTK: {attack}</li>
					<li>DEF: {defense}</li>
					<li>SP AT: {special_attack}</li>
					<li>SP DEF: {special_defense}</li>
					<li>SPEED: {speed}</li>
				</ul>
				<ul>
					<li>HEIGHT: {height}</li>
					<li>WEIGHT: {weight}</li>
				</ul>
				{user && <p>USER: {user.userName}</p>}
			</>
		</div>
	);
}

export default Card;
