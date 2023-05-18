/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
	const [toastList, setToastList] = useState([]);

	const addToast = (toast = { title: '', description: '', type: '' }) => {
		toast.id = crypto.randomUUID();
		if (toastList.length >= 3) {
			const newList = [...toastList];
			newList.shift();
			setToastList([...newList, toast]);
		} else {
			setToastList([...toastList, toast]);
		}
	};

	const deleteToast = (id) => {
		const filter = toastList.filter((toast) => toast.id !== id);
		setToastList([...filter]);
	};

	const data = { toastList, addToast, deleteToast };

	return <ToastContext.Provider value={data}>{children}</ToastContext.Provider>;
};

export default ToastProvider;
