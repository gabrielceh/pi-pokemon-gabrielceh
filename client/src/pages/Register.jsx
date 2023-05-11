import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { registerUser } from '../redux/actions/user.action';
import { apiErrorReset } from '../redux/actions/apieError.actions';
import { resetUser } from '../redux/actions/user.action';
import { ROUTES_NAMES } from '../utils/routes_name';
import { validateRegisterForm } from '../utils/validateForms';
import InputForm from '../components/Inputs/InputForm';

const initialState = {
	email: '',
	password: '',
	repeatPassword: '',
	userName: '',
};

function Register() {
	const [form, setform] = useState(initialState);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const loading = useSelector((state) => state.loading);
	const apiError = useSelector((state) => state.apiError);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			dispatch(apiErrorReset());
			dispatch(resetUser());
		};
	}, []);

	useEffect(() => {
		console.log(apiError);
		if (!apiError.error) {
			return;
		}
		window.alert(apiError?.error);
	}, [apiError]);

	useEffect(() => {
		if (user.access) {
			console.log('success');
			return navigate(ROUTES_NAMES.LOGIN);
		}
	}, [user]);

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setform({
			...form,
			[name]: value,
		});

		setErrors(validateRegisterForm({ ...form, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		for (let input in form) {
			if (!form[input].trim()) return window.alert(`Enter your ${input}`);
		}

		for (let error in errors) {
			if (errors[error]) return window.alert(`${errors[error]}`);
		}

		dispatch(registerUser(form));
	};

	return (
		<div>
			<h2>Register</h2>
			<Link to={ROUTES_NAMES.LOGIN}>Login</Link>
			<form
				action=''
				onSubmit={handleSubmit}>
				<InputForm
					label='Email'
					type='email'
					name='email'
					value={form.email}
					handleInput={handleInputChange}
					error={errors.email}
				/>

				<InputForm
					label='User name'
					type='text'
					name='userName'
					value={form.userName}
					handleInput={handleInputChange}
					error={errors.userName}
				/>

				<InputForm
					label='Password'
					type='password'
					name='password'
					value={form.password}
					handleInput={handleInputChange}
					error={errors.password}
				/>
				<InputForm
					label='Repeat password'
					type='password'
					name='repeatPassword'
					value={form.repeatPassword}
					handleInput={handleInputChange}
					error={errors.repeatPassword}
				/>

				<button
					disabled={loading}
					type='submit'>
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
