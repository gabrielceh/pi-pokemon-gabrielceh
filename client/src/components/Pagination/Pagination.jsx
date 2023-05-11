/* eslint-disable react/prop-types */
import ButtonPagination from './ButtonPagination';
import { base } from '../../utils/endpoints';

// eslint-disable-next-line react/prop-types
function Pagination({
	fetch,
	count,
	limit,
	next,
	prev,
	currentPage,
	setCurrentPage,
	endpoint = {},
	orderPag = null,
}) {
	const totalPages = Math.ceil(count / limit);

	const goToPage = (url) => {
		fetch(url);
	};

	const handleClick = (index) => {
		const orderString = orderPag
			? `&orderby=${orderPag?.orderby}&ordertype=${orderPag?.ordertype}`
			: '';

		let url = `${base}/${endpoint}?offset=${(index - 1) * limit}&limit=${limit}${orderString}`;
		goToPage(url);
		setCurrentPage(index);
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handleClick(i)}
					disabled={currentPage === i}
					className={currentPage === i ? 'active' : ''}>
					{i}
				</button>
			);
		}

		return pageNumbers;
	};

	return (
		<div className='pagination'>
			<ButtonPagination
				handleClick={() => handleClick(1)}
				label='First page'
			/>
			<ButtonPagination
				handleClick={() => handleClick(currentPage - 1)}
				disabled={prev ? false : true}
				label={'Anterior'}
			/>
			{renderPageNumbers()}
			<ButtonPagination
				handleClick={() => handleClick(currentPage + 1)}
				disabled={next ? false : true}
				label={'Siguiente'}
			/>
			<ButtonPagination
				handleClick={() => handleClick(totalPages)}
				label='Last Page'
			/>
		</div>
	);
}

export default Pagination;
