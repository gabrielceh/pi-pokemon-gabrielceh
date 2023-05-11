/* eslint-disable react/prop-types */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiErrorReset, apiErrorSet } from '../../redux/actions/apieError.actions';
import { loaderOn, loaderOff } from '../../redux/actions/loading.actions';
import { base, endpoints } from '../../utils/endpoints';

function FilterSelect({ setEnpoint, setCurrentPage, setOrderPag }) {
	const [dataSelect, setDataSelect] = useState([]);
	const [form, setForm] = useState({
		type: 'all',
	});

	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loading);

	const fetchFilter = async () => {
		dispatch(loaderOn());
		try {
			const { data } = await axios.get(`${base}/${endpoints.types}`);
			setDataSelect(data.results);
		} catch (error) {
			dispatch(apiErrorSet(error.response.data.error));
		} finally {
			dispatch(loaderOff());
		}
	};

	useEffect(() => {
		fetchFilter();
		return () => {
			dispatch(apiErrorReset());
		};
	}, []);

	const handleChange = (event) => {
		const value = event.target.value;
		setForm({
			type: value,
		});
		setCurrentPage(1);
		setOrderPag(null);
		if (value === 'all') {
			setEnpoint(`${endpoints.pokemon}`);
			return;
		}
		setEnpoint(`${endpoints.types}/${value}`);
	};

	return (
		<div>
			{loading ? (
				<p>loading</p>
			) : (
				<form>
					<span>Types: </span>
					<select
						name='type'
						id=''
						onChange={handleChange}
						defaultValue={form.type}>
						<option value='all'>All types</option>
						{dataSelect.map((type) => (
							<option
								key={type.id}
								value={type.id}>
								{type.name}
							</option>
						))}
					</select>
				</form>
			)}
		</div>
	);
}

export default FilterSelect;
