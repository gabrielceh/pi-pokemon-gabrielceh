import { useSelector, useDispatch } from 'react-redux';

import { ROUTES_NAMES } from '../../utils/routes_name';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/user.action';
import SearchButton from '../SearchButton/SearchButton';
import BtnDark from '../BtnDark/BtnDark';
import { ConfigMenu, ContMenu, ContSVG, MenuBar } from './MainMenu.styled';
import HomeICon from '../Icons/HomeIcon';
import AddICon from '../Icons/AddICon';
import UserICon from '../Icons/UserIcon';
import LoginICon from '../Icons/LoginIcon';
import { ButtonMenu } from '../../styled/Button.styled';
import LogoutIcon from '../Icons/LogoutICon';
import HamburgerMenu from '../Icons/HamburgerMenu';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { useModal } from '../../hooks/useModal';

function MainMenu() {
	const { darkMode } = useContext(DarkModeContext);
	const [isOpenConfig, openConfig, closeConfig] = useModal();

	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	const handleOpenConfig = () => {
		if (isOpenConfig) {
			closeConfig();
		} else {
			openConfig();
		}
	};

	return (
		<MenuBar>
			<ContMenu>
				<Link
					to={ROUTES_NAMES.HOME}
					title='Home'>
					<ContSVG>
						<HomeICon />
					</ContSVG>
				</Link>

				<SearchButton />

				<Link
					to={ROUTES_NAMES.ADD}
					title='Add'>
					<ContSVG>
						<AddICon />
					</ContSVG>
				</Link>

				<Link
					to={ROUTES_NAMES.PROFILE}
					title='Profile'>
					<ContSVG>
						<UserICon />
					</ContSVG>
				</Link>

				<ButtonMenu
					onClick={handleOpenConfig}
					title='More'>
					<HamburgerMenu />
				</ButtonMenu>

				{isOpenConfig && (
					<ConfigMenu
						className='animation-gelatine'
						darkMode={darkMode}>
						<BtnDark />
						{!user.access && (
							<>
								<Link
									to={ROUTES_NAMES.LOGIN}
									title='Login'>
									<ContSVG>
										<LoginICon />
									</ContSVG>
								</Link>
							</>
						)}
						{user.access && (
							<div>
								<ButtonMenu
									onClick={handleLogout}
									title='Logout'>
									<LogoutIcon />
								</ButtonMenu>
							</div>
						)}
					</ConfigMenu>
				)}
			</ContMenu>
		</MenuBar>
	);
}

export default MainMenu;
