import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout';

function ProtectedRouted() {
	const user = useSelector((state) => state.user);

	if (!user.access || !user.user) {
		return <Navigate to='/home' />;
	}
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
}

export default ProtectedRouted;
