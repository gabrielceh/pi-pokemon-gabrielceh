/* eslint-disable react/prop-types */
function ButtonPagination({ isFocused, handleClick, label, disabled = false }) {
	return (
		<button
			onClick={handleClick}
			disabled={disabled}>
			{label}
		</button>
	);
}

export default ButtonPagination;
