import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout';

function ProtectedRouted() {
	const user = useSelector((state) => state.user);
	const location = useLocation();
	console.log(location);

	if (!user.access || !user.user || !user.authToken) {
		return <Navigate to='/login' />;
	}
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
}

export default ProtectedRouted;
