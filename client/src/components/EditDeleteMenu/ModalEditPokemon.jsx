/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiErrorSet } from '../../redux/actions/apieError.actions';

import axios from 'axios';
import { base, endpoints } from '../../utils/endpoints';
import { loaderOff, loaderOn } from '../../redux/actions/loading.actions';
import EditForm from './EditForm';
import { Modalstyled } from '../../styled/Modal.styled';
import { ButtonClose, Container, Titile } from './ModalEditPokemon.styled';
import CloseIcon from '../Icons/CloseIcon';

function ModalEditPokemon({ closeModal, pokemonId }) {
	const [form, setForm] = useState(null);
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.loading);

	useEffect(() => {
		const fetchPok = async () => {
			dispatch(loaderOn());
			try {
				const { data } = await axios.get(`${base}/${endpoints.pokemon}/${pokemonId}`);
				const pok = {
					id: data.id,
					name: data.name,
					image: data.image,
					hp: data.hp,
					attack: data.attack,
					defense: data.defense,
					special_attack: data.special_attack,
					special_defense: data.special_defense,
					speed: data.speed,
					height: data.height,
					weight: data.weight,
					types: data.Types.map((item) => item.id),
				};
				setForm(pok);
			} catch (error) {
				dispatch(apiErrorSet(error.response.data.error));
			} finally {
				dispatch(loaderOff());
			}
		};
		fetchPok();
	}, []);

	const handleCloseModal = (event) => {
		event.stopPropagation();
		event.preventDefault();
		closeModal();
	};

	return (
		<Modalstyled className='animation-fade-in '>
			<Container className='animation-bounce-in'>
				<ButtonClose onClick={handleCloseModal}>
					<CloseIcon />
				</ButtonClose>
				{loading && <p>loading...</p>}
				{form && (
					<>
						<Titile>Edit</Titile>
						<EditForm
							formPokemon={form}
							closeModal={closeModal}
						/>
					</>
				)}
			</Container>
		</Modalstyled>
	);
}

export default ModalEditPokemon;
