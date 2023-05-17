import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';
import { ButtonMenu } from '../../styled/Button.styled';
import MoonIcon from '../Icons/MoonIcon';
import SunIcon from '../Icons/SunIcon';

function BtnDark() {
	const { darkMode, themeToggler } = useContext(DarkModeContext);

	const handleThemeToggler = () => themeToggler();

	return (
		<ButtonMenu
			onClick={handleThemeToggler}
			title='Dark mode'>
			{' '}
			{darkMode === 'light' ? <MoonIcon /> : <SunIcon />}
		</ButtonMenu>
	);
}

export default BtnDark;
