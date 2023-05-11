import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../redux/actions/user.action';
import { apiErrorReset } from '../redux/actions/apieError.actions';
import { ROUTES_NAMES } from '../utils/routes_name';
import { useEffect, useState } from 'react';
import { validateLoginForm } from '../utils/validateForms';
import InputForm from '../components/Inputs/InputForm';

const initialState = {
	email: '',
	password: '',
};

function Login() {
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
			return navigate(ROUTES_NAMES.HOME);
		}
	}, [user]);

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setform({
			...form,
			[name]: value,
		});
		setErrors(validateLoginForm({ ...form, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		for (let input in form) {
			if (!form[input].trim()) return window.alert(`Enter your ${input}`);
		}

		for (let error in errors) {
			if (errors[error]) return window.alert(`${errors[error]}`);
		}

		dispatch(login(form));
	};

	return (
		<div>
			<h2>Login</h2>
			<Link to={ROUTES_NAMES.REGISTER}>REGISTER</Link>
			<form
				action=''
				onSubmit={handleSubmit}>
				<InputForm
					label='Email'
					type='email'
					name='email'
					value={form.email}
					error={errors.email}
					handleInput={handleInputChange}
				/>
				<InputForm
					label='Password'
					type='password'
					name='password'
					value={form.password}
					error={errors.password}
					handleInput={handleInputChange}
				/>

				<button
					disabled={loading}
					type='submit'>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
