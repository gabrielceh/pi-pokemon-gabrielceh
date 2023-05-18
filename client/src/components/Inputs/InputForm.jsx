/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ErrorMsg, Input, InputContainer, Label } from './Input.styled';
import { DarkModeContext } from '../../context/DarkModeContext';

function InputForm({
	label,
	type,
	name,
	value,
	handleInput,
	error,
	placeholder = '',
	min = 0,
	max = 255,
}) {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<InputContainer>
			<Label
				htmlFor={name}
				darkMode={darkMode}>
				{label}
			</Label>
			<Input
				type={type}
				value={value}
				name={name}
				id={name}
				onChange={handleInput}
				error={error ? true : false}
				placeholder={placeholder}
				darkMode={darkMode}
				min={min}
				max={max}
			/>
			{error ? <ErrorMsg>{error}</ErrorMsg> : <ErrorMsg> </ErrorMsg>}
		</InputContainer>
	);
}

export default InputForm;
