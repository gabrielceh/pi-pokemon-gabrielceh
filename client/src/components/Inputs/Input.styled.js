import styled from 'styled-components';

export const InputGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	& div {
		width: 50%;
	}
`;

export const InputContainer = styled.div`
	width: 100%;
	padding: 0.2rem 0rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Label = styled.label`
	font-size: ${({ theme }) => theme.fontSize.sm};
	color: ${({ theme }) => theme.colors.slate['500']};
	letter-spacing: 0.1rem;
`;

export const Input = styled.input`
	padding: 0.7rem 0.5rem;
	outline: none;
	border-radius: 5px;
	border: ${({ theme, error }) =>
		!error ? `2px solid ${theme.colors.darkBlue['200']}` : `2px solid ${theme.colors.red['200']}`};
	color: ${({ theme, error }) => (error ? theme.colors.red['200'] : theme.text)};
	font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const ImageInput = styled.input``;

export const ErrorMsg = styled.span`
	font-size: ${({ theme }) => theme.fontSize.sm};
	color: ${({ theme }) => theme.colors.red['500']};
	font-weight: 600;
	min-height: 0.5rem;
`;

export const ImageShowCont = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
	overflow: hidden;
	border: ${({ theme }) => `1px solid ${theme.colors.darkBlue['200']}`};
`;

export const ImageShow = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
`;

export const BtnCloseImg = styled.button`
	cursor: pointer;
	padding: 0;
	position: absolute;
	right: -2%;
	top: 2%;
	border: none;
	background-color: transparent;

	& svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['900']};
		fill: white;
		border-radius: 10px;
		transition: stroke 0.3s ease-in-out;
		width: 2rem;
		height: 2rem;
	}

	&:hover svg {
		stroke: ${({ theme }) => theme.colors.darkBlue['500']};
	}
`;
