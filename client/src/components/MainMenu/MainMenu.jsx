import { useSelector, useDispatch } from 'react-redux';

import { ROUTES_NAMES } from '../../utils/routes_name';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/user.action';

function MainMenu() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<nav>
			<Link to={ROUTES_NAMES.HOME}>Home</Link>
			{user.access && <Link to={ROUTES_NAMES.ADD}>Add</Link>}
			{!user.access && (
				<>
					<Link to={ROUTES_NAMES.LOGIN}>LOGIN</Link> |{' '}
				</>
			)}
			{user.access && (
				<div>
					<p>{user.user.userName}</p>
					<button onClick={handleLogout}>logout</button>
				</div>
			)}
		</nav>
	);
}

export default MainMenu;
