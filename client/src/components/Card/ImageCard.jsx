/* eslint-disable react/prop-types */

import { ImageContainer, Img } from './ImageCard.styled';

function ImageCard({ srcImg, altImg, type }) {
	return (
		<ImageContainer
			type={type}
			className='animation-height'
			// style={{ transform: `translateX(${pos.posX}px)` }}
		>
			<Img
				src={srcImg}
				alt={altImg}
			/>
		</ImageContainer>
	);
}

export default ImageCard;
