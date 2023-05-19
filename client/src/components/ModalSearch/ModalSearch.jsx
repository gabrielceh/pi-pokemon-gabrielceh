import { useState } from 'react';
import axios from 'axios';

import { base, endpoints } from '../../utils/endpoints';
import { Modalstyled } from '../../styled/Modal.styled.js';
import { Container, ButtonClose, Result, ErrorSearch, ContainerTop } from './ModalSearch.styled.js';
import FormSearch from '../FormSearch/FormSearch';
import Card from '../Card/Card';
import LoadingSearch from '../Loading/LoadingSearch';

/* eslint-disable react/prop-types */
function ModalSearch({ closeModal }) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSearch = async (search) => {
		setLoading(true);
		setError(null);
		setData(null);
		try {
			const { data } = await axios(`${base}/${endpoints.pokemon}?name=${search}`);
			setData(data);
		} catch (error) {
			setError(error.response.data.error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Modalstyled className='animation-fade-in'>
			<Container className='animation-gelatine '>
				<ContainerTop>
					<ButtonClose onClick={closeModal}>ESC</ButtonClose>
					<FormSearch onSearch={handleSearch} />
				</ContainerTop>
				<Result>
					{loading && <LoadingSearch />}
					{data && (
						<div>
							<p>Result:</p>
							<Card
								pokemon={data}
								onClose={closeModal}
							/>
						</div>
					)}
					{error && <ErrorSearch>{error}</ErrorSearch>}
				</Result>
			</Container>
		</Modalstyled>
	);
}

export default ModalSearch;
