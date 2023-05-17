import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiErrorReset, apiErrorSet } from '../../redux/actions/apieError.actions';
import { loaderOff, loaderOn } from '../../redux/actions/loading.actions';
import { base, endpoints } from '../../utils/endpoints';

import DetailComponent from '../../components/DetailComponent/DetailComponent';
import { ContainerPage } from '../../styled/Container.styled';

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
		<>
			{loading ? (
				<p></p>
			) : (
				<ContainerPage
					className='detail'
					type={pokemon?.Types[0]?.name}>
					<DetailComponent
						pokemon={pokemon}
						loading={loading}
					/>
				</ContainerPage>
			)}
		</>
	);
}

export default Detail;
