import styled from 'styled-components';

const classesPosition = (position) => {
	const pos = {
		'top-right': `
			top: 12px;
			right: 12px;
		`,
		'bottom-right': `
			bottom: 12px;
			right: 12px;
		`,
		'top-left': `
			top: 12px;
			left: 12px;
		`,
		'bottom-left': `
			bottom: 12px;
			left: 12px;
		`,
		'top-center': `
			top: 24px;
			left: 50%;
			transform: translateX(-50%);
		`,
		'bottom-center': `
			bottom: 24px;
			left: 50%;
			transform: translateX(-50%);
		`,
	};
	return pos[position] ? pos[position] : pos['top-left'];
};

const types = (type, theme) => {
	const typeColor = {
		success: theme.colors.emerald['100'],
		error: theme.colors.red['200'],
		warning: theme.colors.yellow['200'],
		info: theme.colors.darkBlue['200'],
	};

	return typeColor[type];
};

const typesText = (type, theme) => {
	const typeColor = {
		success: theme.colors.emerald['600'],
		error: theme.colors.red['600'],
		warning: theme.colors.yellow['600'],
		info: theme.colors.darkBlue['600'],
	};

	return typeColor[type];
};

export const NotificationToastContainer = styled.div`
	z-index: 10;
	box-sizing: border-box;
	position: fixed;
	${({ position }) => classesPosition(position)}
`;

export const ButtonToast = styled.button`
	cursor: pointer;
	position: absolute;
	right: 20px;
	background-color: transparent;
	border: none;
	font-size: ${({ theme }) => theme.fontSize.xl};
	color: ${({ theme }) => theme.colors.slate['50']};
	padding: 0.1rem 0.5rem;
	border-radius: 5px;
	transition: scale 0.3s ease-in-out, background-color 0.3s ease-in-out;

	&:hover {
		scale: 1.2;
		background-color: ${({ theme }) => `${theme.colors.slate['50']}55`};
	}
`;

export const NotificationToast = styled.div`
	position: relative;
	width: 350px;
	padding: 1rem;
	border-radius: 10px;
	background-color: ${({ theme, type }) => `${types(type, theme)}`};
	box-shadow: ${({ theme, type }) => `0px 0px 5px ${types(type, theme)}`};
	color: ${({ theme, type }) => typesText(type, theme)};
	margin-bottom: 1rem;

	animation-name: showed;
	animation-duration: 0.2s;
	animation-timing-function: ease-in-out;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;

	@keyframes showed {
		${({ position }) => positionFrames[position]}
	}
`;
export const NotificationToastTitle = styled.h3`
	font-size: ${({ theme }) => theme.fontSize.xl};
	font-weight: 700;
	margin-bottom: 0.5rem;
`;
export const NotificationToastMessage = styled.p`
	font-size: ${({ theme }) => theme.fontSize.sm};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const positionFrames = {
	'bottom-left': `
		0%{
			left:-1000px;
		}
		100%{
			left: 0px
		}
	`,
	'bottom-right': `
		0%{
			right:-1000px;
		}
		100%{
			right: 0px
		}
	`,
	'top-left': `
		0%{
			left:-1000px;
		}
		100%{
			left: 0px
		}
	`,
	'top-right': `
		0%{
			right:-1000px;
		}
		100%{
			right: 0px
		}
	`,
	'top-center': `
		0%{
			top:-1000px;
		}
		100%{
			top: 0px
		}
	`,
	'bottom-center': `
		0%{
			bottom:-1000px;
		}
		100%{
			bottom: 0px
		}
	`,
};
