// eslint-disable-next-line react/prop-types
function InputForm({ label, type, name, value, handleInput, error }) {
	return (
		<div>
			<label htmlFor={name}>{label}:</label>
			<input
				type={type}
				value={value}
				name={name}
				id={name}
				onChange={handleInput}
			/>
			{error ? <span>{error}</span> : <span> </span>}
		</div>
	);
}

export default InputForm;
