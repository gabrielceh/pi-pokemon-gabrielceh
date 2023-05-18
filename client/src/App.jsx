import { useEffect, useContext } from 'react';
import AppRouter from './routes/AppRouter';
import { lightTheme, darkTheme } from './Theme';
import { DarkModeContext } from './context/DarkModeContext';
import { GlobalStyles } from './globalStyles';
import Toast from './components/Toast/Toast';
import { ToastContext } from './context/ToastContext.jsx';

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
import { resetSuccessPokemonUser } from './redux/actions/pokemonUser.action';

function App() {
	const { darkMode } = useContext(DarkModeContext);
	const { toastList, deleteToast, addToast } = useContext(ToastContext);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const pokemonUser = useSelector((state) => state.pokemonUser);
	const apiError = useSelector((state) => state.apiError);

	useEffect(() => {
		if (!apiError.error) {
			return;
		}
		addToast({
			title: 'Error',
			description: apiError?.error,
			type: 'error',
		});
	}, [apiError.error]);

	useEffect(() => {
		if (!pokemonUser?.success) {
			return;
		}
		addToast({
			title: 'Success',
			description: pokemonUser.success,
			type: 'success',
		});
		dispatch(resetSuccessPokemonUser());
	}, [pokemonUser]);

	useEffect(() => {
		// if (user.access) return;

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
				{toastList.length > 0 && (
					<Toast
						toastList={toastList}
						deleteToast={deleteToast}
						position='top-center'
					/>
				)}
			</ThemeProvider>
		</>
	);
}

export default App;
