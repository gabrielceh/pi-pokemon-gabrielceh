/* eslint-disable react/prop-types */

import { ErrorMsg, InputContainer, Label, MultiSelect } from './Input.styled';

function MultipleSelect({ label, name, defaultValue, onchange, data = [], error }) {
	return (
		<InputContainer>
			<Label htmlFor={name}>{label}</Label>
			<MultiSelect
				name={name}
				id={name}
				defaultValue={defaultValue}
				onChange={onchange}
				multiple={true}>
				{data.length &&
					data.map((type) => (
						<option
							key={type.id}
							value={type.id}>
							{type.name}
						</option>
					))}
			</MultiSelect>
			{error ? <ErrorMsg>{error}</ErrorMsg> : <ErrorMsg> </ErrorMsg>}
		</InputContainer>
	);
}

export default MultipleSelect;
