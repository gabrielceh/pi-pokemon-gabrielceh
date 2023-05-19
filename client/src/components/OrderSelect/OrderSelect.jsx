/* eslint-disable react/prop-types */
import LetterDescending from '../Icons/LetterDescending';
import LettersAscending from '../Icons/LettersAscending';
import NumberAscending from '../Icons/NumbersAscending';
import NumbersDescending from '../Icons/NumbersDescending';
import ResetICon from '../Icons/ResetIcon';
import { ButtonGroup, ButtonOrder, ContButtons, ContDiv, LabelGroup } from './OrderSelect.styled';

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
		<ContDiv>
			<ContButtons>
				<LabelGroup>Name</LabelGroup>
				<ButtonGroup>
					<ButtonOrder
						title='Asc. name'
						disabled={handleDisabled(orderByOption.name, orderTypeOptions.asc)}
						onClick={() => handleOrder(orderByOption.name, orderTypeOptions.asc)}>
						<LettersAscending />
					</ButtonOrder>
					<ButtonOrder
						title='Desc. name'
						disabled={handleDisabled(orderByOption.name, orderTypeOptions.desc)}
						onClick={() => handleOrder(orderByOption.name, orderTypeOptions.desc)}>
						<LetterDescending />
					</ButtonOrder>
				</ButtonGroup>
			</ContButtons>

			<ContButtons>
				<LabelGroup>Attack</LabelGroup>
				<ButtonGroup>
					<ButtonOrder
						title='Asc. attack'
						disabled={handleDisabled(orderByOption.attack, orderTypeOptions.asc)}
						onClick={() => handleOrder(orderByOption.attack, orderTypeOptions.asc)}>
						<NumberAscending />
					</ButtonOrder>
					<ButtonOrder
						title='Desc. attack'
						disabled={handleDisabled(orderByOption.attack, orderTypeOptions.desc)}
						onClick={() => handleOrder(orderByOption.attack, orderTypeOptions.desc)}>
						<NumbersDescending />
					</ButtonOrder>
				</ButtonGroup>
			</ContButtons>

			<ContButtons>
				<LabelGroup>Reset</LabelGroup>
				<ButtonGroup>
					<ButtonOrder
						title='Reset Order'
						onClick={resetOrder}>
						<ResetICon />
					</ButtonOrder>
				</ButtonGroup>
			</ContButtons>
		</ContDiv>
	);
}

export default OrderSelect;
