/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { apiErrorReset } from '../../redux/actions/apieError.actions';
import { deleteUserPokemon, resetSuccessPokemonUser } from '../../redux/actions/pokemonUser.action';
import ModalEditPokemon from './ModalEditPokemon';
import ModalDelete from './ModalDelete';
import VerticalDots from '../Icons/VerticalDots';
import { ButtonMenu, ContainerMenu, MenuItems, MenuOptions } from './EditDeleteMenu.styles';

function EditDeleteMenu({ pokemonId, pokemonName }) {
	const dispatch = useDispatch();
	const apiError = useSelector((state) => state.apiError);
	const pokemonUser = useSelector((state) => state.pokemonUser);

	const [isOpenMenu, openMenu, closeMenu] = useModal();
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
		window.alert('EditDeleteMenu:', apiError?.error);
	}, [apiError]);

	useEffect(() => {
		if (!pokemonUser.success) {
			return;
		}
		window.alert('EditDeleteMenu:', pokemonUser.success);
	}, [pokemonUser]);

	const handleOpenMenu = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (isOpenMenu) return closeMenu();

		openMenu();
	};

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
			<ContainerMenu>
				<ButtonMenu onClick={handleOpenMenu}>
					<VerticalDots />
				</ButtonMenu>

				{isOpenMenu && (
					<MenuOptions className='animation-width'>
						<MenuItems onClick={handleEdit}>Edit</MenuItems>
						<MenuItems onClick={openModalDelete}>Delete</MenuItems>
					</MenuOptions>
				)}
			</ContainerMenu>
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
