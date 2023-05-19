/* eslint-disable react/prop-types */
import { useState } from 'react';
import { endpoints } from '../../utils/endpoints';
import { Form, LabelGroup, Select } from '../../styled/HeaderHome';

function OriginSelect({ setEnpoint, setCurrentPage, setOrderPag }) {
	const [form, setForm] = useState({
		type: 'all',
	});

	const handleChange = (event) => {
		const value = event.target.value;
		setForm({
			type: value,
		});
		setCurrentPage(1);
		setOrderPag(null);
		if (value === 'original') {
			setEnpoint(`${endpoints.pokemon_api}`);
			return;
		}
		if (value === 'users') {
			setEnpoint(`${endpoints.pokemon_users}`);
			return;
		}

		setEnpoint(`${endpoints.pokemon}`);
	};

	return (
		<div>
			<Form>
				<LabelGroup>Origin</LabelGroup>
				<Select
					name='type'
					id=''
					onChange={handleChange}
					defaultValue={form.type}>
					<option value='all'>All origin</option>
					<option value='original'>Original Pokémon</option>
					<option value='users'>Users Pokémon</option>
				</Select>
			</Form>
		</div>
	);
}

export default OriginSelect;
