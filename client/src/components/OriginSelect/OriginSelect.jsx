import { useState } from 'react';
import { endpoints } from '../../utils/endpoints';

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
			<form>
				<span>Origin</span>
				<select
					name='type'
					id=''
					onChange={handleChange}
					defaultValue={form.type}>
					<option value='all'>All origin</option>
					<option value='original'>Original Pokémon</option>
					<option value='users'>Users Pokémon</option>
				</select>
			</form>
		</div>
	);
}

export default OriginSelect;
