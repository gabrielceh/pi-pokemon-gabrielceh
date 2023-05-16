import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '../../utils/routes_name';
import { ContainerStyled } from '../../styled/Container.styled';
import { Div, Flex, SectionImage, SectionTitle, Title } from './landing.styles';
import pikachuImg from '../../assets/img/pikachu_init.png';

function Landing() {
	return (
		<Div className='animation-move-up '>
			<ContainerStyled>
				<Flex>
					<SectionTitle>
						<Title>PokedexApi by @Gabrielcehu</Title>

						<Link
							to={ROUTES_NAMES.HOME}
							className='link'>
							HOME
						</Link>
					</SectionTitle>
					<SectionImage>
						<img
							src={pikachuImg}
							alt='pikachu'
						/>
					</SectionImage>
				</Flex>
			</ContainerStyled>
		</Div>
	);
}

export default Landing;
