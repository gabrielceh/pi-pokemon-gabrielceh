import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiErrorReset, apiErrorSet } from '../../redux/actions/apieError.actions';
import { getTypes } from '../../redux/actions/types.actions';
import { createUserPokemon, resetSuccessPokemonUser } from '../../redux/actions/pokemonUser.action';
import { getUrlFromImage } from '../../utils/getUrlFromImage';
import { getImageToShow } from '../../utils/showImage';
import { imageTypes, validateCreateForm } from '../../utils/validateForms';
import { InputGroup } from '../Inputs/Input.styled';
import InputImage from '../Inputs/InputImage';
import MultipleSelect from '../Inputs/MultipleSelect';
import { ButtonForm } from '../../styled/Button.styled';
import { Form } from '../../styled/Form.styled';
import InputForm from '../Inputs/InputForm';

const initialForm = {
	name: '',
	hp: '1',
	attack: '1',
	defense: '1',
	special_attack: '1',
	special_defense: '1',
	speed: '1',
	weight: '1',
	height: '1',
	types: [],
};
function FormCreate() {
	const [form, setForm] = useState(initialForm);
	const [base64ToShow, setBase64ToShow] = useState(null);
	const [errors, setErrors] = useState({});
	const formImage = document.getElementById('formImage');
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const typesPokemon = useSelector((state) => state.typesPokemon);
	const pokemonUser = useSelector((state) => state.pokemonUser);

	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		if (!typesPokemon.length) {
			dispatch(getTypes());
		}
		return () => {
			dispatch(apiErrorReset());
			dispatch(resetSuccessPokemonUser());
		};
	}, []);

	useEffect(() => {
		if (!pokemonUser?.success) {
			return;
		}
		let id = pokemonUser.results[0].id;

		navigate(`/detail/${id}`);
	}, [pokemonUser]);

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
			if (errors[error]) return dispatch(apiErrorSet(`${errors[error]}`));
		}

		let getUrl = '';
		if (formImage.files.length) {
			getUrl = await getUrlFromImage(base64ToShow);
		}

		dispatch(createUserPokemon({ ...form, image: getUrl }));
	};

	return (
		<Form
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

			<InputImage
				label='My Pokémon image'
				name='formImage'
				onchange={handleImageChange}
				src={base64ToShow}
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

			{typesPokemon.length && (
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
				className='create'
				disabled={loading}>
				{loading ? 'Loading...' : 'Create'}
			</ButtonForm>
		</Form>
	);
}

export default FormCreate;
