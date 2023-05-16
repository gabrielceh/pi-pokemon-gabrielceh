import { ErrorMsg, Input, InputContainer, Label } from './Input.styled';

// eslint-disable-next-line react/prop-types
function InputForm({ label, type, name, value, handleInput, error, placeholder = '' }) {
	return (
		<InputContainer>
			<Label htmlFor={name}>{label}</Label>
			<Input
				type={type}
				value={value}
				name={name}
				id={name}
				onChange={handleInput}
				error={error ? true : false}
				placeholder={placeholder}
			/>
			{error ? <ErrorMsg>{error}</ErrorMsg> : <ErrorMsg> </ErrorMsg>}
		</InputContainer>
	);
}

export default InputForm;
