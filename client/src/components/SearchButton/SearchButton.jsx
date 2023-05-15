import { useModal } from '../../hooks/useModal';
import ModalSearch from '../ModalSearch/ModalSearch';

function SearchButton() {
	const [isOpen, openModal, closeModal] = useModal();

	return (
		<>
			<button onClick={openModal}>🔍</button>
			{isOpen && <ModalSearch closeModal={closeModal} />}
		</>
	);
}

export default SearchButton;
