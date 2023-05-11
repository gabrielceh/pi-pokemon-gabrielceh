/* eslint-disable react/prop-types */
import LetterDescending from '../Icons/LetterDescending';
import LettersAscending from '../Icons/LettersAscending';
import NumberAscending from '../Icons/NumbersAscending';
import NumbersDescending from '../Icons/NumbersDescending';

const orderByOption = {
	name: 'name',
	attack: 'attack',
};

const orderTypeOptions = {
	asc: 'asc',
	desc: 'desc',
};

function OrderSelect({ handleOrder, resetOrder, orderPag }) {
	const handleDisabled = (orderby, ordertype) => {
		if (orderPag === null) return false;
		if (
			orderPag.orderby === orderByOption[orderby] &&
			orderPag.ordertype === orderTypeOptions[ordertype]
		)
			return true;
		else {
			return false;
		}
	};

	return (
		<div>
			<section>
				<span>Name</span>
				<button
					disabled={handleDisabled(orderByOption.name, orderTypeOptions.asc)}
					onClick={() => handleOrder(orderByOption.name, orderTypeOptions.asc)}>
					<LettersAscending />
				</button>
				<button
					disabled={handleDisabled(orderByOption.name, orderTypeOptions.desc)}
					onClick={() => handleOrder(orderByOption.name, orderTypeOptions.desc)}>
					<LetterDescending />
				</button>
			</section>

			<section>
				<span>Attack</span>
				<button
					disabled={handleDisabled(orderByOption.attack, orderTypeOptions.asc)}
					onClick={() => handleOrder(orderByOption.attack, orderTypeOptions.asc)}>
					<NumberAscending />
				</button>
				<button
					disabled={handleDisabled(orderByOption.attack, orderTypeOptions.desc)}
					onClick={() => handleOrder(orderByOption.attack, orderTypeOptions.desc)}>
					<NumbersDescending />
				</button>
			</section>
			<button onClick={resetOrder}>Reset order</button>
		</div>
	);
}

export default OrderSelect;
