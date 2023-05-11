import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES_NAMES } from '../utils/routes_name';
import { logout } from '../redux/actions/user.action';
import { loaderOn, loaderOff } from '../redux/actions/loading.actions';
import { apiErrorSet, apiErrorReset } from '../redux/actions/apieError.actions';
import { base, endpoints } from '../utils/endpoints';

import Pagination from '../components/Pagination/Pagination';
import Cards from '../components/Cards/Cards';

function Home() {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [next, setNext] = useState(null);
	const [prev, setPrev] = useState(null);
	const [endPointPag, setEndPontPag] = useState(endpoints.pokemon);
	const [orderPag, setOrderPag] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const limit = 12;

	const user = useSelector((state) => state.user);
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
	}, []);

	const handleClick = () => {
		dispatch(logout());
	};

	return (
		<div>
			<h2>Home</h2>
			{!user.access && (
				<>
					<Link to={ROUTES_NAMES.LOGIN}>LOGIN</Link> |{' '}
					<Link to={ROUTES_NAMES.REGISTER}>REGISTER</Link>
				</>
			)}
			{user.access && (
				<div>
					<p>{user.user.userName}</p>
					<p>{user.user.email}</p>
					<button onClick={handleClick}>logout</button>
				</div>
			)}
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
		</div>
	);
}

export default Home;
