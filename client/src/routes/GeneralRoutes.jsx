import MainLayout from '../components/MainLayout/MainLayout';
import { Outlet } from 'react-router-dom';

function GeneralRoutes() {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
}

export default GeneralRoutes;
