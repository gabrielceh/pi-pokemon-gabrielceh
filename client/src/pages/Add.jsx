import { useEffect, useState } from 'react';
import InputForm from '../components/Inputs/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import { apiErrorReset } from '../redux/actions/apieError.actions';
import { getTypes } from '../redux/actions/types.actions';
import { createUserPokemon, resetSuccessPokemonUser } from '../redux/actions/pokemonUser.action';
import { getUrlFromImage } from '../utils/getUrlFromImage';
import { getImageToShow } from '../utils/showImage';
import { imageTypes, validateCreateForm } from '../utils/validateForms';

const initialForm = {
	name: '',
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
	const [base64ToShow, setBase64ToShow] = useState(null);
	const [errors, setErrors] = useState({});
	const formImage = document.getElementById('formImage');

	const dispatch = useDispatch();
	const typesPokemon = useSelector((state) => state.typesPokemon);
	const pokemonUser = useSelector((state) => state.pokemonUser);
	const apiError = useSelector((state) => state.apiError);
	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		console.log(apiError);
		if (!apiError.error) {
			return;
		}
		window.alert(apiError?.error);
	}, [apiError]);

	useEffect(() => {
		if (!pokemonUser?.success) {
			return;
		}
		console.log(pokemonUser.success);
		dispatch(resetSuccessPokemonUser());
	}, [pokemonUser]);

	useEffect(() => {
		if (!typesPokemon.length) {
			dispatch(getTypes());
		}
		return () => {
			dispatch(apiErrorReset());
			dispatch(resetSuccessPokemonUser());
		};
	}, []);

	const handleInputChange = (event) => {
		const nameInput = event.target.name;
		const value = event.target.value;
		setForm({
			...form,
			[nameInput]: value,
		});
		setErrors(
			validateCreateForm({
				...form,
				[nameInput]: value,
			})
		);
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
		setErrors(
			validateCreateForm({
				...form,
				types: value,
			})
		);
	};

	const handleImageChange = async (event) => {
		if (imageTypes(event.target.files[0].type) === false) {
			setErrors({
				...form,
				image: 'Invalid format. Only: .png, .jpg, .svg, .webp',
			});
			formImage.value = '';
			return setBase64ToShow(null);
		}
		const url = await getImageToShow(event.target.files[0]);
		setBase64ToShow(url);

		setErrors(
			validateCreateForm({
				...form,
				...errors,
				image: event.target.files[0],
			})
		);
	};

	const handleOnCloseImage = (event) => {
		event.preventDefault();
		formImage.value = '';
		setBase64ToShow(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		for (let error in errors) {
			if (errors[error]) return window.alert(`${errors[error]}`);
		}

		let getUrl = '';
		if (formImage.files.length) {
			getUrl = await getUrlFromImage(base64ToShow);
		}

		dispatch(createUserPokemon({ ...form, image: getUrl }));
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

			<div>
				<label htmlFor='formImage'>My Pokémon image</label>
				<input
					type='file'
					name='formImage'
					id='formImage'
					onChange={handleImageChange}
				/>
				{base64ToShow && (
					<>
						<button onClick={handleOnCloseImage}>x</button>
						<img
							src={base64ToShow}
							alt={form.name}
							width={100}
							height={100}
						/>
					</>
				)}
				{errors.image ? <span>{errors.image}</span> : <span> </span>}
			</div>

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
				name='weight'
				value={form.weight}
				handleInput={handleInputChange}
				error={errors.weight}
			/>

			{loading ? (
				<div>Loading</div>
			) : (
				<div>
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
					{errors.types ? <span>{errors.types}</span> : <span> </span>}
				</div>
			)}

			<button disabled={loading}>send</button>
		</form>
	);
}

export default Add;
