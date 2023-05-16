import { useEffect, useContext } from 'react';
import AppRouter from './routes/AppRouter';
import { lightTheme, darkTheme } from './Theme';
import { DarkModeContext } from './context/DarkModeContext';
import { GlobalStyles } from './globalStyles';

// import Cookies from 'js-cookie';
/**
 * En el archivo vote.config añadir lo siguiente  para que funcione jwt-decode
 	optimizeDeps: {
		exclude: ['js-big-decimal'],
	},
	*/
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserByLocal } from './redux/actions/user.action';
import { ThemeProvider } from 'styled-components';

function App() {
	const { darkMode } = useContext(DarkModeContext);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (user.access) return;

		const auth_token = localStorage.getItem('auth_token');
		if (auth_token) {
			const decode = jwt_decode(auth_token);
			if (decode.exp < Date.now() / 1000) {
				localStorage.removeItem(auth_token);
				dispatch(logout());
				return;
			}
			dispatch(
				setUserByLocal({
					user: {
						email: decode.userEmail,
						userId: decode.userId,
						userName: decode.userName,
					},
					authToken: auth_token,
				})
			);
		}
	}, [user.access]);

	return (
		<>
			<ThemeProvider theme={darkMode === 'light' ? lightTheme : darkTheme}>
				<GlobalStyles />
				<AppRouter />
			</ThemeProvider>
		</>
	);
}

export default App;
