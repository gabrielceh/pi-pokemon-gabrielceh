/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
	ButtonToast,
	NotificationToast,
	NotificationToastContainer,
	NotificationToastMessage,
	NotificationToastTitle,
} from './Toast.styled';

//Depende del proyecto
import { useDispatch } from 'react-redux';
import { apiErrorReset } from '../../redux/actions/apieError.actions';
import { resetSuccessPokemonUser } from '../../redux/actions/pokemonUser.action';

function Toast({
	toastList = [],
	position = 'top-left',
	deleteToast,
	autoDelete = true,
	autoDeleteTime = 5000,
}) {
	const [list, setList] = useState(toastList);

	const dispatch = useDispatch();

	useEffect(() => {
		setList(toastList);
	}, [toastList]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoDelete && toastList.length && list.length) {
				deleteToast(toastList[0].id);
			}
		}, autoDeleteTime);

		return () => {
			clearInterval(interval);
			dispatch(apiErrorReset());
			dispatch(resetSuccessPokemonUser());
		};
	}, [toastList]);

	return (
		<NotificationToastContainer
			className={position}
			position={position}>
			{list.map((toast, i) => (
				<NotificationToast
					key={i}
					type={toast.type}
					position={position}>
					<ButtonToast onClick={() => deleteToast(toast.id)}>x</ButtonToast>
					<div>
						<NotificationToastTitle>{toast.title}</NotificationToastTitle>
						<NotificationToastMessage>{toast.description}</NotificationToastMessage>
					</div>
				</NotificationToast>
			))}
		</NotificationToastContainer>
	);
}

export default Toast;
