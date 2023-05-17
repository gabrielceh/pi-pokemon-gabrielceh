/* eslint-disable react/prop-types */

function DetailComponent({ pokemon, loading }) {
	return (
		<div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<section>
					<h1>{pokemon?.name}</h1>
					{pokemon?.image && (
						<img
							src={pokemon.image}
							alt={pokemon.name}
						/>
					)}
					<ul>
						TYPES:
						{pokemon?.Types.map((type) => (
							<li key={type.id}>{type.name}</li>
						))}
					</ul>

					<ul>
						STATS
						<li>
							<span>HP:</span> <span>{pokemon?.hp}</span>
						</li>
						<li>
							<span>ATTACK:</span>
							<span>{pokemon?.attack}</span>
						</li>
						<li>
							<span>DEFENSE:</span>
							<span>{pokemon?.defense}</span>
						</li>
						<li>
							<span>SPECIAL ATTACK:</span>
							<span>{pokemon?.special_attack}</span>
						</li>
						<li>
							<span>SPECIAL DEFENSE:</span>
							<span>{pokemon?.special_defense}</span>
						</li>
						<li>
							<span>SPEED:</span>
							<span>{pokemon?.speed}</span>
						</li>
					</ul>

					<ul>
						{pokemon?.height && (
							<li>
								<span>HEIGHT: </span>
								<span>{pokemon?.height}</span>
							</li>
						)}
						{pokemon?.weight && (
							<li>
								<span>WEIGHT: </span>
								<span>{pokemon?.weight}</span>
							</li>
						)}
					</ul>
				</section>
			)}
		</div>
	);
}

export default DetailComponent;
