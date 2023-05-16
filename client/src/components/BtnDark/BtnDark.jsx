import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

function BtnDark() {
	const { darkMode, themeToggler } = useContext(DarkModeContext);

	const handleThemeToggler = () => themeToggler();

	return <button onClick={handleThemeToggler}> {darkMode === 'light' ? '🌚' : '🌞'}</button>;
}

export default BtnDark;
