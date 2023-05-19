/* eslint-disable react/prop-types */
import { ContainerStyled } from '../../styled/Container.styled';
import Card from '../Card/Card';
import { ContainerCards } from './Cards.styled';

function Cards({ data = [] }) {
	return (
		<ContainerStyled>
			<ContainerCards>
				{data.length &&
					data.map((item) => (
						<Card
							key={item.id}
							pokemon={item}
						/>
					))}
			</ContainerCards>
		</ContainerStyled>
	);
}

export default Cards;
