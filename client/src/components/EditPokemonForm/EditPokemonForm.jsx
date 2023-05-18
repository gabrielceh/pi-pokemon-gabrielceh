/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSuccessPokemonUser, updateUserPokemon } from '../../redux/actions/pokemonUser.action';

import { apiErrorReset } from '../../redux/actions/apieError.actions';
import { imageTypes, validateEdit } from '../../utils/validateForms';
import { getImageToShow } from '../../utils/showImage';
import { getUrlFromImage } from '../../utils/getUrlFromImage';
import InputForm from '../Inputs/InputForm';
import InputImage from '../Inputs/InputImage';
import { InputGroup } from '../Inputs/Input.styled';
import MultipleSelect from '../Inputs/MultipleSelect';
import { ButtonForm } from '../../styled/Button.styled';
import { Form } from '../../styled/Form.styled';

function EditPokemonForm({ formPokemon, typesPokemon }) {
	const [form, setForm] = useState(formPokemon);
	const [urlImageToShow, seturlImageToShow] = useState(null);
	const [errors, setErrors] = useState({});

	const formImage = document.getElementById('formImage');

	const dispatch = useDispatch();

	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		seturlImageToShow(formPokemon.image ? formPokemon.image : null);
		if (formPokemon.image) {
			setForm({
				...form,
				image: formPokemon.image,
			});
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
			validateEdit({
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
			validateEdit({
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
			return seturlImageToShow(formPokemon.image);
		}
		const url = await getImageToShow(event.target.files[0]);
		seturlImageToShow(url);

		setErrors(
			validateEdit({
				...form,
				...errors,
				image: event.target.files[0],
			})
		);
	};

	const handleOnCloseImage = () => {
		formImage.value = '';
		seturlImageToShow(null);
	};

	const handleSubmit = async () => {
		for (let error in errors) {
			if (errors[error]) return window.alert(`${errors[error]}`);
		}

		let getUrl = '';
		if (urlImageToShow && formImage.value) {
			console.log('go');
			getUrl = await getUrlFromImage(urlImageToShow);
		}

		dispatch(updateUserPokemon({ ...form, image: getUrl || form.image }));
	};
	return (
		<Form onSubmit={handleSubmit}>
			<h2>Edit {formPokemon.name}</h2>
			<InputForm
				label='My Pokémon name'
				type='text'
				name='name'
				value={form.name}
				handleInput={handleInputChange}
				error={errors.name}
			/>

			<InputImage
				label='My Pokémon image'
				name='formImage'
				onchange={handleImageChange}
				src={urlImageToShow}
				closeImg={handleOnCloseImage}
				alt={form.name}
				error={errors.image}
			/>
			<InputGroup>
				<InputForm
					label={`My Pókemon HP: ${form.hp}`}
					type='range'
					name='hp'
					value={form.hp}
					handleInput={handleInputChange}
					error={errors.hp}
					min={1}
					max={255}
				/>
				<InputForm
					label={`My Pókemon Attack: ${form.attack}`}
					type='range'
					name='attack'
					value={form.attack}
					handleInput={handleInputChange}
					error={errors.attack}
					min={1}
					max={255}
				/>
			</InputGroup>

			<InputGroup>
				<InputForm
					label={`My Pókemon Defense: ${form.defense}`}
					type='range'
					name='defense'
					value={form.defense}
					handleInput={handleInputChange}
					error={errors.defense}
					min={1}
					max={255}
				/>
				<InputForm
					label={`My Pókemon Sp. Attack: ${form.special_attack}`}
					type='range'
					name='special_attack'
					value={form.special_attack}
					handleInput={handleInputChange}
					error={errors.special_attack}
					min={1}
					max={255}
				/>
			</InputGroup>

			<InputGroup>
				<InputForm
					label={`My Pókemon Sp. Defense: ${form.special_defense}`}
					type='range'
					name='special_defense'
					value={form.special_defense}
					handleInput={handleInputChange}
					error={errors.special_defense}
					min={1}
					max={255}
				/>
				<InputForm
					label={`My Pókemon Speed: ${form.speed}`}
					type='range'
					name='speed'
					value={form.speed}
					handleInput={handleInputChange}
					error={errors.speed}
					min={1}
					max={255}
				/>
			</InputGroup>

			<InputGroup>
				<InputForm
					label={`My Pókemon Height: ${form.height}`}
					type='range'
					name='height'
					value={form.height}
					handleInput={handleInputChange}
					error={errors.height}
					min={1}
					max={999}
				/>
				<InputForm
					label={`My Pókemon Weight: ${form.weight}`}
					type='range'
					name='weight'
					value={form.weight}
					handleInput={handleInputChange}
					error={errors.weight}
					min={1}
					max={999}
				/>
			</InputGroup>
			{loading ? (
				<div>Loading</div>
			) : (
				<MultipleSelect
					label='My Pokémon types'
					name='types'
					defaultValue={form.types}
					onchange={handleMultipleSelect}
					data={typesPokemon}
					error={errors.types}
				/>
			)}

			<ButtonForm
				className='edit'
				disabled={loading}>
				Edit
			</ButtonForm>
		</Form>
	);
}

export default EditPokemonForm;
