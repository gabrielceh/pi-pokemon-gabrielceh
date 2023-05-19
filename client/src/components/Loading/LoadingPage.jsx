import img from '../../assets/img/red_pikachu.gif';
import { Container, LoaderCont } from './Loading.styled';

function LoadingPage() {
	return (
		<LoaderCont>
			<Container>
				<img
					src={img}
					alt='Red and pikachu'
				/>
				<h2>LOADING ...</h2>
			</Container>
		</LoaderCont>
	);
}

export default LoadingPage;
