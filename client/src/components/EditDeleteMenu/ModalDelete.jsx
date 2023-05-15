/* eslint-disable react/prop-types */

function ModalDelete({ pokemonId, pokemonName, onAccept, closeModal }) {
	const handleAccept = (event) => {
		onAccept(event, pokemonId);
		closeModal();
	};

	return (
		<div>
			<p>{`Are you sure you want to remove ${pokemonName}?`}</p>
			<button onClick={handleAccept}>Accept</button>
			<button onClick={closeModal}>Cancel</button>
		</div>
	);
}

export default ModalDelete;
