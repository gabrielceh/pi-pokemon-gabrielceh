import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiErrorReset } from '../../redux/actions/apieError.actions';
import { loaderOff, loaderOn } from '../../redux/actions/loading.actions';
import { base, endpoints } from '../../utils/endpoints';
import { ContainerPage } from '../../styled/Container.styled';
import EditPokemonForm from '../../components/EditPokemonForm/EditPokemonForm';
import { getTypes } from '../../redux/actions/types.actions';

function EditPokemon() {
	const [pokemon, setPokemon] = useState(null);
	const [error, setError] = useState(null);
	const params = useParams();

	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loading);
	const typesPokemon = useSelector((state) => state.typesPokemon);

	useEffect(() => {
		const fetchDetail = async () => {
			dispatch(loaderOn());
			try {
				const { data } = await axios.get(`${base}/${endpoints.pokemon}/${params.id}`);
				const pokemon = {
					id: data.id,
					name: data.name,
					image: data.image,
					hp: data.hp,
					attack: data.attack,
					defense: data.defense,
					special_attack: data.special_attack,
					special_defense: data.special_defense,
					speed: data.speed,
					height: data.height || '',
					weight: data.weight || '',
					types: data.Types.map((item) => item.id),
				};
				console.log(data);
				setPokemon(pokemon);
				if (!typesPokemon.length) {
					dispatch(getTypes());
				}
			} catch (error) {
				setError(error.response.data.error);
			} finally {
				dispatch(loaderOff());
			}
		};

		fetchDetail();
		return () => {
			dispatch(apiErrorReset());
		};
	}, []);

	return (
		<ContainerPage>
			{loading && <p>Loading</p>}
			{!loading && pokemon && (
				<EditPokemonForm
					formPokemon={pokemon}
					typesPokemon={typesPokemon}
				/>
			)}
			{error && <p>{error}</p>}
		</ContainerPage>
	);
}

export default EditPokemon;
