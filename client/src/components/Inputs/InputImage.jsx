/* eslint-disable react/prop-types */

import CloseIcon from '../Icons/CloseIcon';
import {
	BtnCloseImg,
	ErrorMsg,
	ImageInput,
	ImageShow,
	ImageShowCont,
	InputContainer,
	Label,
} from './Input.styled';

function InputImage({ label, name, onchange, alt, src, closeImg, error }) {
	return (
		<InputContainer>
			<Label htmlFor={name}>{label}:</Label>

			<ImageInput
				type='file'
				name={name}
				id={name}
				onChange={onchange}
			/>

			{src && (
				<ImageShowCont>
					<BtnCloseImg onClick={closeImg}>
						<CloseIcon />
					</BtnCloseImg>
					<ImageShow
						src={src}
						alt={alt}
					/>
				</ImageShowCont>
			)}
			{error ? <ErrorMsg>{error}</ErrorMsg> : <ErrorMsg> </ErrorMsg>}
		</InputContainer>
	);
}

export default InputImage;
