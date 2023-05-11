import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoutes() {
	const user = useSelector((state) => state.user);

	if (user.access & user.user) {
		return <Navigate to='/home' />;
	}

	return <Outlet />;
}

export default PublicRoutes;
