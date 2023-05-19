import styled from 'styled-components';

export const InputGroup = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	gap: 1rem;

	@media (${({ theme }) => theme.screenSize.tablet}) {
		justify-content: space-between;
		flex-direction: row;

		& div {
			width: 50%;
		}
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
	font-weight: 700;
	color: ${({ theme, darkMode }) =>
		darkMode === 'light' ? theme.colors.slate['600'] : theme.colors.slate['300']};
	letter-spacing: 0.1rem;
`;

export const Input = styled.input`
	width: 100%;
	padding: 0.7rem 0.5rem;
	outline: none;
	border-radius: 5px;
	border: ${({ theme, error }) =>
		!error ? `2px solid ${theme.colors.darkBlue['200']}` : `2px solid ${theme.colors.red['400']}`};
	font-size: ${({ theme }) => theme.fontSize.lg};
	color: ${({ theme, darkMode }) =>
		darkMode === 'light' ? theme.colors.darkBlue['900'] : theme.colors.darkBlue['50']};
	background-color: ${({ theme, darkMode }) =>
		darkMode === 'light' ? theme.colors.darkBlue['50'] : theme.colors.darkBlue['900']};

	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

	&[type='range'] {
		width: '100%';
		height: '10px';
		appearance: 'none';
		background-color: 'gray';
		outline: 'none';
		padding: 0;
	}
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

export const MultiSelect = styled.select`
	padding: 0.2rem 1rem;
	height: 120px;
	font-size: ${({ theme }) => theme.fontSize.lg};
	border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['300']}`};
	border-radius: 5px;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border 0.3s ease-in-out;

	&:focus {
		outline: none;
		border: ${({ theme }) => `2px solid ${theme.colors.darkBlue['600']}`};
	}
`;
