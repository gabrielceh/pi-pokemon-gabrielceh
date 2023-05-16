/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState('light');

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme');
		localTheme && setDarkMode(localTheme);
	}, []);

	const setMode = (mode) => {
		window.localStorage.setItem('theme', mode);
		setDarkMode(mode);
	};

	const themeToggler = () => {
		darkMode === 'light' ? setMode('dark') : setMode('light');
	};

	const data = { darkMode, themeToggler };

	return <DarkModeContext.Provider value={data}>{children}</DarkModeContext.Provider>;
}

export default DarkModeProvider;
