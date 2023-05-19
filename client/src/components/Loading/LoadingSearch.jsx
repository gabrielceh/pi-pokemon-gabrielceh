import img from '../../assets/img/red_pikachu.gif';
import { Container, LoadingSection } from './Loading.styled';

function LoadingSearch() {
	return (
		<LoadingSection>
			<Container>
				<img
					src={img}
					alt='Red and pikachu'
				/>
				<h2>LOADING ...</h2>
			</Container>
		</LoadingSection>
	);
}

export default LoadingSearch;
