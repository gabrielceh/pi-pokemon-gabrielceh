import { useEffect, useState } from 'react';
import InputForm from '../components/Inputs/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import { apiErrorReset } from '../redux/actions/apieError.actions';
import { getTypes } from '../redux/actions/types.actions';

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

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const typesPokemon = useSelector((state) => state.typesPokemon);
	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		if (!typesPokemon.length) {
			dispatch(getTypes());
		}
		console.log(typesPokemon);
		return () => {
			dispatch(apiErrorReset());
		};
	}, []);

	const handleInputChange = (event) => {
		const nameInput = event.target.name;
		const value = event.target.value;
		setForm({
			...form,
			[nameInput]: value,
		});
	};

	const handleMultipleSelect = (event) => {
		const options = event.target.options;
		const value = [];

		for (let i = 0; i < options.length; i++) {
			if (value.length > 2) {
				return;
			}
			if (options[i].selected) {
				const v = parseInt(options[i].value);
				value.push(v);
			}
		}

		setForm({
			...form,
			types: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(form);
	};

	return (
		<form
			action=''
			onSubmit={handleSubmit}>
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
				label='My Pókemon Attack'
				type='number'
				name='attack'
				value={form.attack}
				handleInput={handleInputChange}
				error={errors.attack}
			/>
			<InputForm
				label='My Pókemon Defense'
				type='number'
				name='defense'
				value={form.defense}
				handleInput={handleInputChange}
				error={errors.defense}
			/>
			<InputForm
				label='My Pókemon Special Attack'
				type='number'
				name='special_attack'
				value={form.special_attack}
				handleInput={handleInputChange}
				error={errors.special_attack}
			/>
			<InputForm
				label='My Pókemon Special Defense'
				type='number'
				name='special_defense'
				value={form.special_defense}
				handleInput={handleInputChange}
				error={errors.special_defense}
			/>
			<InputForm
				label='My Pókemon Speed'
				type='number'
				name='speed'
				value={form.speed}
				handleInput={handleInputChange}
				error={errors.speed}
			/>
			<InputForm
				label='My Pókemon Height'
				type='number'
				name='height'
				value={form.height}
				handleInput={handleInputChange}
				error={errors.height}
			/>
			<InputForm
				label='My Pókemon Weight'
				type='number'
				name='Weight'
				value={form.weight}
				handleInput={handleInputChange}
				error={errors.weight}
			/>

			{loading ? (
				<div>Loading</div>
			) : (
				<select
					name='types'
					id='types'
					value={form.types}
					onChange={handleMultipleSelect}
					multiple={true}>
					{typesPokemon.length &&
						typesPokemon.map((type) => (
							<option
								key={type.id}
								value={type.id}>
								{type.name}
							</option>
						))}
				</select>
			)}

			<button>send</button>
		</form>
	);
}

export default Add;
