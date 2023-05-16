/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSuccessPokemonUser, updateUserPokemon } from '../../redux/actions/pokemonUser.action';
import { getTypes } from '../../redux/actions/types.actions';
import { apiErrorReset } from '../../redux/actions/apieError.actions';
import { imageTypes, validateEdit } from '../../utils/validateForms';
import InputForm from '../Inputs/InputForm';
import { getImageToShow } from '../../utils/showImage';
import { getUrlFromImage } from '../../utils/getUrlFromImage';
import InputImage from '../Inputs/InputImage';
import MultipleSelect from '../Inputs/MultipleSelect';
import { InputGroup } from '../Inputs/Input.styled';
import { ButtonForm } from '../../styled/Button.styled';

function EditForm({ formPokemon, closeModal }) {
	const [form, setForm] = useState(formPokemon);
	const [urlImageToShow, seturlImageToShow] = useState(null);
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
		window.alert('EditForm', apiError?.error);
	}, [apiError]);

	useEffect(() => {
		if (!pokemonUser?.success) {
			return;
		}
		closeModal();
		dispatch(resetSuccessPokemonUser());
	}, [pokemonUser]);

	useEffect(() => {
		console.log(formPokemon);
		seturlImageToShow(formPokemon.image);
		if (!typesPokemon.length) {
			dispatch(getTypes());
		}
		return () => {
			dispatch(apiErrorReset());
			dispatch(resetSuccessPokemonUser());
		};
	}, []);

	const handleInputChange = (event) => {
		event.preventDefault();
		event.stopPropagation();
		const nameInput = event.target.name;
		const value = event.target.value;
		setForm({
			...form,
			[nameInput]: value,
		});
		console.log(errors);
		console.log(form);
		setErrors(
			validateEdit({
				...form,
				[nameInput]: value,
			})
		);
	};

	const handleMultipleSelect = (event) => {
		event.preventDefault();
		event.stopPropagation();
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
		event.preventDefault();
		event.stopPropagation();
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

	const handleOnCloseImage = (event) => {
		event.preventDefault();
		event.stopPropagation();
		formImage.value = '';
		seturlImageToShow(null);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();

		for (let error in errors) {
			if (errors[error]) return window.alert(`${errors[error]}`);
		}

		let getUrl = '';
		if (formImage.files.length) {
			getUrl = await getUrlFromImage(urlImageToShow);
		}

		dispatch(updateUserPokemon({ ...form, image: getUrl || form.image }));
	};

	return (
		form && (
			<form onSubmit={handleSubmit}>
				<InputForm
					label='My Pókemon name'
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
				</InputGroup>

				<InputGroup>
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
				</InputGroup>

				<InputGroup>
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
				</InputGroup>

				<InputGroup>
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
			</form>
		)
	);
}

export default EditForm;
