import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '../utils/routes_name';

function Landing() {
	return (
		<div>
			<h2>Landing</h2>
			<Link to={ROUTES_NAMES.HOME}>HOME</Link>
		</div>
	);
}

export default Landing;
