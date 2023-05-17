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
import { ContainerPage } from '../../styled/Container.styled';

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
	const dispatch = useDispatch();

	const fetchPokemonList = async (url) => {
		dispatch(loaderOn());
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
		console.log(orderby);
		setOrderPag({
			orderby,
			ordertype,
		});
		setCurrentPage(1);
		const pag = `?offset=0&limit=${limit}`;
		fetchPokemonList(`${base}/${endPointPag}/${pag}&orderby=${orderby}&ordertype=${ordertype}`);
	};

	const resetOrder = () => {
		setOrderPag(null);
		setCurrentPage(1);
		const pag = `?offset=0&limit=${limit}`;
		fetchPokemonList(`${base}/${endPointPag}/${pag}`);
	};

	return (
		<ContainerPage>
			<h2>Home</h2>

			<OrderSelect
				handleOrder={handleOrder}
				resetOrder={resetOrder}
				orderPag={orderPag}
			/>
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
			{loading ? (
				<p>loading</p>
			) : (
				<>
					<Cards data={data} />
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
				</>
			)}
		</ContainerPage>
	);
}

export default Home;
