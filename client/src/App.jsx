import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
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

function App() {
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
			<AppRouter />
		</>
	);
}

export default App;
