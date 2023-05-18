import { Routes, Route } from 'react-router-dom';
import { ROUTES_NAMES } from '../utils/routes_name';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Page404 from '../pages/Page404/Page404';
import Landing from '../pages/Landing/Landing';
import Home from '../pages/Home/Home';
import Detail from '../pages/Detail/Detail';
import Profile from '../pages/Profile/Profile';
import Add from '../pages/Add/Add';
import EditPokemon from '../pages/EditPokemon/EditPokemon';
import PublicRoutes from './PublicRoutes';
import GeneralRoutes from './GeneralRoutes';
import ProtectedRouted from './ProtectedRouted';
import MainLayout from '../components/MainLayout/MainLayout';

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
				<Route
					path={ROUTES_NAMES.PROFILE}
					element={<Profile />}
				/>
				<Route
					path={`${ROUTES_NAMES.EDIT}/:id`}
					element={<EditPokemon />}
				/>
			</Route>

			<Route
				path='*'
				element={
					<MainLayout>
						<Page404 />
					</MainLayout>
				}
			/>
		</Routes>
	);
}

export default AppRouter;
