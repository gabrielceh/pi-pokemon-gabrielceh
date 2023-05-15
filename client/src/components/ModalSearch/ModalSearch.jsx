import { useState } from 'react';
import axios from 'axios';

import { base, endpoints } from '../../utils/endpoints';
import FormSearch from '../FormSearch/FormSearch';
import Card from '../Card/Card';

/* eslint-disable react/prop-types */
function ModalSearch({ closeModal }) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSearch = async (search) => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios(`${base}/${endpoints.pokemon}?name=${search}`);
			setData(data);
		} catch (error) {
			setError(error.response.data.error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<button onClick={closeModal}>x</button>
			<FormSearch onSearch={handleSearch} />
			<div>
				{loading && <p>loading</p>}
				{data && <Card pokemon={data} />}
				{error && <p>{error}</p>}
			</div>
		</div>
	);
}

export default ModalSearch;
