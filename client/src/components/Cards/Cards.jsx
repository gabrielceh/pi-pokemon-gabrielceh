/* eslint-disable react/prop-types */
import Card from '../Card/Card';

function Cards({ data = [] }) {
	return (
		<>
			{data.length &&
				data.map((item) => (
					<Card
						key={item.id}
						pokemon={item}
					/>
				))}
		</>
	);
}

export default Cards;
