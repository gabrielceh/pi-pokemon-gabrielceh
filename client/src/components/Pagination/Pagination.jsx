/* eslint-disable react/prop-types */
import ButtonPagination from './ButtonPagination';
import { base } from '../../utils/endpoints';
import RightArrow from '../Icons/RightArrow';
import LeftArrow from '../Icons/LeftArrow';
import { ButtonsNumbers, PagContainer } from './Pagination.styled';

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
				<ButtonsNumbers
					key={i}
					onClick={() => handleClick(i)}
					className={currentPage === i ? 'focus' : ''}
					disabled={currentPage === i}
					label={i}>
					{i}
				</ButtonsNumbers>
			);
		}

		return pageNumbers;
	};

	return (
		<PagContainer className='pagination'>
			<ButtonPagination
				handleClick={() => handleClick(1)}
				label='1...'
			/>
			<ButtonPagination
				handleClick={() => handleClick(currentPage - 1)}
				disabled={prev ? false : true}
				label={<LeftArrow />}
			/>
			{renderPageNumbers()}
			<ButtonPagination
				handleClick={() => handleClick(currentPage + 1)}
				disabled={next ? false : true}
				label={<RightArrow />}
			/>
			<ButtonPagination
				handleClick={() => handleClick(totalPages)}
				label={`...${totalPages}`}
			/>
		</PagContainer>
	);
}

export default Pagination;
