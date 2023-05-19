import { BtnPag } from './Pagination.styled';

/* eslint-disable react/prop-types */
function ButtonPagination({ isFocused, handleClick, label, disabled = false }) {
	return (
		<BtnPag
			onClick={handleClick}
			className={isFocused ? 'focus' : ''}
			disabled={disabled}>
			{label}
		</BtnPag>
	);
}

export default ButtonPagination;
