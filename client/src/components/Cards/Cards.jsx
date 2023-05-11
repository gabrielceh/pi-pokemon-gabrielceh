import React from 'react';
import Card from '../Card/Card';

function Cards({ data = [] }) {
	console.log(data);
	return (
		<>
			{data.map((item) => (
				<Card
					key={item.id}
					pokemon={item}
				/>
			))}
		</>
	);
}

export default Cards;
