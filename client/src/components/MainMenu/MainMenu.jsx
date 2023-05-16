import { useSelector, useDispatch } from 'react-redux';

import { ROUTES_NAMES } from '../../utils/routes_name';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/user.action';
import SearchButton from '../SearchButton/SearchButton';
import BtnDark from '../BtnDark/BtnDark';
import { MenuBar } from './MainMenu.styled';

function MainMenu() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<MenuBar>
			<Link to={ROUTES_NAMES.HOME}>Home</Link>
			<SearchButton />
			<Link to={ROUTES_NAMES.ADD}>Add</Link>
			<div>
				<BtnDark />
				<Link to={ROUTES_NAMES.PROFILE}>Profile</Link>
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
			</div>
		</MenuBar>
	);
}

export default MainMenu;
