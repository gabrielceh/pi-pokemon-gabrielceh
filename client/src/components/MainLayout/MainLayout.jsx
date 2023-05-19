/* eslint-disable react/prop-types */
import { useLocation } from 'react-router-dom';
import PokemonLogo from '../Icons/PokemonLogo';
import MainMenu from '../MainMenu/MainMenu';
import { Main, MainHeader, PageContainer } from './MainLayout.styled';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { useSelector } from 'react-redux';
import { ContainerStyled } from '../../styled/Container.styled';

function MainLayout({ children }) {
	const location = useLocation();
	const { darkMode } = useContext(DarkModeContext);
	const user = useSelector((state) => state.user);

	return (
		<Main>
			<MainMenu />
			<PageContainer>
				{!location.pathname.includes('/detail') && (
					<ContainerStyled>
						<MainHeader darkMode={darkMode}>
							<PokemonLogo />
							{user.user && <h4>Hi, {user.user.userName}!</h4>}
						</MainHeader>
					</ContainerStyled>
				)}
				{children}
			</PageContainer>
		</Main>
	);
}

export default MainLayout;
