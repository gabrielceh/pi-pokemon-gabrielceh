/* eslint-disable react/prop-types */
import Card from '../Card/Card';
import { ContainerCards } from './Cards.styled';

function Cards({ data = [] }) {
	return (
		<ContainerCards>
			{data.length &&
				data.map((item) => (
					<Card
						key={item.id}
						pokemon={item}
					/>
				))}
		</ContainerCards>
	);
}

export default Cards;
