import { ContainerPage, ContainerStyled } from '../../styled/Container.styled';
import img from '../../assets/img/pikachu404.jpg';
import { Link } from 'react-router-dom';
import { ROUTES_NAMES } from '../../utils/routes_name';
import { Img404, Page404Cont, Span, Title } from './Page404.styled';

function Page404() {
	return (
		<ContainerPage>
			<ContainerStyled>
				<Page404Cont>
					<Title className='animation-bounce-in-2'>
						404 <Span>page not found</Span>
					</Title>
					<Img404
						className='animation-gelatine-2'
						src={img}
						alt='Pikachu crying'
					/>
					<Link to={ROUTES_NAMES.HOME}>Home</Link>
				</Page404Cont>
			</ContainerStyled>
		</ContainerPage>
	);
}

export default Page404;
