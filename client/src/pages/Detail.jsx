import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiErrorReset, apiErrorSet } from '../redux/actions/apieError.actions';
import { loaderOff, loaderOn } from '../redux/actions/loading.actions';
import { base, endpoints } from '../utils/endpoints';

function Detail() {
	const [pokemon, setPokemon] = useState(null);
	const params = useParams();
	const loading = useSelector((state) => state.loading);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchDetail = async () => {
			dispatch(loaderOn());
			try {
				const { data } = await axios.get(`${base}/${endpoints.pokemon}/${params.id}`);
				console.log(data);
				setPokemon(data);
			} catch (error) {
				dispatch(apiErrorSet(error.response.data.error));
			} finally {
				dispatch(loaderOff());
			}
		};

		fetchDetail();
		return () => {
			dispatch(apiErrorReset());
		};
	}, [params]);

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

export default Detail;
