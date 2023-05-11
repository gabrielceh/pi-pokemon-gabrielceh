import { useState } from 'react';
import InputForm from '../components/Inputs/InputForm';

const initialForm = {
	name: '',
	image: '',
	hp: '',
	attack: '',
	defense: '',
	special_attack: '',
	special_defense: '',
	speed: '',
	weight: '',
	height: '',
	types: [],
};
function Add() {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});

	const handleInputChange = (event) => {
		const nameInput = event.target.name;
		const value = event.target.value;
		setForm({
			...form,
			[nameInput]: value,
		});
	};
	return (
		<form action=''>
			<h1>Create your Pokémon!!</h1>
			<InputForm
				label='My Pókemon name'
				type='text'
				name='name'
				value={form.name}
				handleInput={handleInputChange}
				error={errors.name}
			/>
			<InputForm
				label='My Pókemon Image'
				type='url'
				name='image'
				value={form.image}
				handleInput={handleInputChange}
				error={errors.image}
			/>
			<InputForm
				label='My Pókemon HP'
				type='number'
				name='hp'
				value={form.hp}
				handleInput={handleInputChange}
				error={errors.hp}
			/>
			<InputForm
				label='My Pókemon HP'
				type='number'
				name='hp'
				value={form.hp}
				handleInput={handleInputChange}
				error={errors.hp}
			/>
		</form>
	);
}

export default Add;
