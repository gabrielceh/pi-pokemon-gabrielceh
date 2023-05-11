import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '../utils/routes_name';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user.action';
import { useEffect } from 'react';

function Home() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		console.log('HOME', user);
	}, [user]);

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
					<button onClick={handleClick}>logout</button>
				</div>
			)}
		</div>
	);
}

export default Home;
