/* eslint-disable react/prop-types */
import MainMenu from '../MainMenu/MainMenu';

function MainLayout({ children }) {
	return (
		<div>
			<MainMenu />
			{children}
		</div>
	);
}

export default MainLayout;
