/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { apiErrorReset } from '../../redux/actions/apieError.actions';
import { deleteUserPokemon, resetSuccessPokemonUser } from '../../redux/actions/pokemonUser.action';
import ModalEditPokemon from '../ModalEditPokemon/ModalEditPokemon';
import ModalDelete from './ModalDelete';

function EditDeleteMenu({ pokemonId, pokemonName }) {
	const dispatch = useDispatch();
	const apiError = useSelector((state) => state.apiError);
	const pokemonUser = useSelector((state) => state.pokemonUser);

	const [isOpenEdit, openModalEdit, closeModalEdit] = useModal();
	const [isOpenDelete, openModalDelete, closeModalDelete] = useModal();

	useEffect(() => {
		console.log(pokemonId);
		return () => {
			dispatch(apiErrorReset());
			dispatch(resetSuccessPokemonUser());
		};
	}, []);

	useEffect(() => {
		if (!apiError.error) {
			return;
		}
		window.alert(apiError?.error);
	}, [apiError]);

	useEffect(() => {
		if (!pokemonUser.success) {
			return;
		}
		window.alert(pokemonUser.success);
	}, [pokemonUser]);

	const handleEdit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		openModalEdit();
	};
	const handleDelete = (event, pokemonId) => {
		event.preventDefault();
		dispatch(deleteUserPokemon(pokemonId));
	};
	return (
		<>
			<nav>
				<button onClick={handleEdit}>Edit</button>
				<button onClick={openModalDelete}>Delete</button>
			</nav>

			{isOpenEdit && (
				<ModalEditPokemon
					closeModal={closeModalEdit}
					pokemonId={pokemonId}
				/>
			)}

			{isOpenDelete && (
				<ModalDelete
					closeModal={closeModalDelete}
					onAccept={handleDelete}
					pokemonName={pokemonName}
					pokemonId={pokemonId}
				/>
			)}
		</>
	);
}

export default EditDeleteMenu;
