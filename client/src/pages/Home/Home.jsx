/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loaderOn, loaderOff } from '../../redux/actions/loading.actions';
import { apiErrorSet, apiErrorReset } from '../../redux/actions/apieError.actions';
import { base, endpoints } from '../../utils/endpoints';

import Pagination from '../../components/Pagination/Pagination';
import Cards from '../../components/Cards/Cards';
import OrderSelect from '../../components/OrderSelect/OrderSelect';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import OriginSelect from '../../components/OriginSelect/OriginSelect';
import { ContainerPage, ContainerStyled } from '../../styled/Container.styled';
import { OptionsContainer, SelectsCont } from './Home.styled';
import LoadingPage from '../../components/Loading/LoadingPage';

function Home() {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [next, setNext] = useState(null);
	const [prev, setPrev] = useState(null);
	const [endPointPag, setEndPontPag] = useState(endpoints.pokemon);
	const [orderPag, setOrderPag] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const limit = 12;

	const loading = useSelector((state) => state.loading);
	const apiError = useSelector((state) => state.apiError);
	const dispatch = useDispatch();

	const fetchPokemonList = async (url) => {
		dispatch(loaderOn());
		setData([]);
		try {
			const { data } = await axios.get(url);
			setData(data.results);
			setCount(data.count);
			setNext(data.next);
			setPrev(data.prev);
		} catch (error) {
			dispatch(apiErrorSet(error.response.data.error));
		} finally {
			dispatch(loaderOff());
		}
	};

	useEffect(() => {
		fetchPokemonList(`${base}/${endPointPag}`);
		return () => {
			dispatch(apiErrorReset());
		};
	}, [endPointPag]);

	const handleOrder = (orderby, ordertype) => {
		setOrderPag({
			orderby,
			ordertype,
		});
		setCurrentPage(1);
		const pag = `?offset=0&limit=${limit}`;
		fetchPokemonList(`${base}/${endPointPag}/${pag}&orderby=${orderby}&ordertype=${ordertype}`);
	};

	const resetOrder = () => {
		if (orderPag) {
			setOrderPag(null);
			setCurrentPage(1);
			const pag = `?offset=0&limit=${limit}`;
			fetchPokemonList(`${base}/${endPointPag}/${pag}`);
		}
	};

	return (
		<ContainerPage>
			<ContainerStyled>
				<OptionsContainer>
					<OrderSelect
						handleOrder={handleOrder}
						resetOrder={resetOrder}
						orderPag={orderPag}
					/>
					<SelectsCont>
						<FilterSelect
							setEnpoint={setEndPontPag}
							setCurrentPage={setCurrentPage}
							setOrderPag={setOrderPag}
						/>

						<OriginSelect
							setCurrentPage={setCurrentPage}
							setEnpoint={setEndPontPag}
							setOrderPag={setOrderPag}
						/>
					</SelectsCont>
				</OptionsContainer>
			</ContainerStyled>

			{loading && <LoadingPage />}

			{data.length && (
				<>
					<Cards data={data} />
					<ContainerStyled>
						<Pagination
							fetch={fetchPokemonList}
							count={count}
							results={data}
							endpoint={endPointPag}
							orderPag={orderPag}
							setEndPontPag={setEndPontPag}
							limit={limit}
							next={next}
							prev={prev}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					</ContainerStyled>
				</>
			)}

			{!data.length && <h2>No Results</h2>}

			{apiError.error && (
				<ContainerStyled>
					<h2>{apiError.error}</h2>
				</ContainerStyled>
			)}
		</ContainerPage>
	);
}

export default Home;
