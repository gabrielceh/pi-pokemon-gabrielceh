import { Routes, Route } from 'react-router-dom';
import { ROUTES_NAMES } from '../utils/routes_name';
import PublicRoutes from './PublicRoutes';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import GeneralRoutes from './GeneralRoutes';
import Add from '../pages/Add';
import ProtectedRouted from './ProtectedRouted';

function AppRouter() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Landing />}
			/>
			<Route
				path='/'
				element={<PublicRoutes />}>
				<Route
					path={ROUTES_NAMES.LOGIN}
					element={<Login />}
				/>
				<Route
					path={ROUTES_NAMES.REGISTER}
					element={<Register />}
				/>
			</Route>

			<Route
				path='/'
				element={<GeneralRoutes />}>
				<Route
					path={ROUTES_NAMES.HOME}
					element={<Home />}
				/>
				<Route
					path={`${ROUTES_NAMES.DETAIL}/:id`}
					element={<Detail />}
				/>
			</Route>

			<Route
				path='/'
				element={<ProtectedRouted />}>
				<Route
					path={ROUTES_NAMES.ADD}
					element={<Add />}
				/>
			</Route>

			<Route
				path='*'
				element={<Page404 />}
			/>
		</Routes>
	);
}

export default AppRouter;
