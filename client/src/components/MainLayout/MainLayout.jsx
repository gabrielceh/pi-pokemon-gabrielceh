/* eslint-disable react/prop-types */
import MainMenu from '../MainMenu/MainMenu';
import { Main } from './MainLayout.styled';

function MainLayout({ children }) {
	return (
		<Main>
			<MainMenu />
			{children}
		</Main>
	);
}

export default MainLayout;
