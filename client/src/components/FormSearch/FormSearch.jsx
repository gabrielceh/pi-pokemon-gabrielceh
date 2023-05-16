/* eslint-disable react/prop-types */
import { useState } from 'react';
import InputForm from '../Inputs/InputForm';
import { useSelector } from 'react-redux';
import { ButtonForm } from '../../styled/Button.styled';
import { Formstyled } from './FormSearch.styled';

function FormSearch({ onSearch }) {
	const [search, setSearch] = useState('');
	const [error, setError] = useState('');
	const loading = useSelector((state) => state.loading);

	const handleInput = (event) => {
		setSearch(event.target.value);

		if (!event.target.value.trim()) {
			setError('Please, enter a search');
		} else {
			setError('');
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (error) return window.alert(`${error}`);

		onSearch(search);
	};

	return (
		<Formstyled onSubmit={handleSubmit}>
			<InputForm
				label=''
				placeholder='Ex: pikachu'
				type='search'
				name='search'
				value={search}
				handleInput={handleInput}
				error={error}
			/>
			<div>
				<ButtonForm
					className='search'
					disabled={loading}>
					search
				</ButtonForm>
			</div>
		</Formstyled>
	);
}

export default FormSearch;
