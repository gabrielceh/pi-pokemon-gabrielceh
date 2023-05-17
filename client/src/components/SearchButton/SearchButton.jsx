import { useModal } from '../../hooks/useModal';
import { ButtonMenu } from '../../styled/Button.styled';
import SearchIcon from '../Icons/SearchIcon';
import ModalSearch from '../ModalSearch/ModalSearch';

function SearchButton() {
	const [isOpen, openModal, closeModal] = useModal();

	return (
		<>
			<ButtonMenu
				onClick={openModal}
				title='Search'>
				<SearchIcon />
			</ButtonMenu>
			{isOpen && <ModalSearch closeModal={closeModal} />}
		</>
	);
}

export default SearchButton;
