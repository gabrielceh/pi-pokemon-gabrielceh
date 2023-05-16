/* eslint-disable react/prop-types */

import { Modalstyled } from '../../styled/Modal.styled.js';
import { Container, Title, ButtonContainer, Button } from './ModalDeletePokemon.styled.js';

function ModalDelete({ pokemonId, pokemonName, onAccept, closeModal }) {
	const handleAccept = (event) => {
		event.preventDefault();
		event.stopPropagation();
		onAccept(event, pokemonId);
		closeModal();
	};

	const handleClose = (event) => {
		event.preventDefault();
		event.stopPropagation();
		closeModal();
	};

	return (
		<Modalstyled className='animation-fade-in'>
			<Container className='animation-bounce-in'>
				<Title>{`Are you sure you want to remove ${pokemonName}?`}</Title>
				<ButtonContainer>
					<Button
						className='delete'
						onClick={handleAccept}>
						Delete
					</Button>
					<Button
						className='cancel'
						onClick={handleClose}>
						Cancel
					</Button>
				</ButtonContainer>
			</Container>
		</Modalstyled>
	);
}

export default ModalDelete;
