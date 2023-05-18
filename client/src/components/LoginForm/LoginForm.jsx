import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user.action';
import { apiErrorReset } from '../../redux/actions/apieError.actions';
import { ROUTES_NAMES } from '../../utils/routes_name';
import { validateLoginForm } from '../../utils/validateForms';
import InputForm from '../Inputs/InputForm';
import { Form } from '../../styled/Form.styled';
import { Containerform, Title } from './LoginForm.styled';
import { ButtonForm } from '../../styled/Button.styled';

const initialState = {
	email: '',
	password: '',
};

function LoginForm() {
	const [form, setform] = useState(initialState);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const loading = useSelector((state) => state.loading);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			dispatch(apiErrorReset());
		};
	}, []);

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
		<Containerform>
			<Title>“Me, give up? No way!”</Title>
			<Form
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

				<ButtonForm
					className='login'
					disabled={loading}
					type='submit'>
					Login
				</ButtonForm>
				<div>
					<p>
						{`You don't have an account? `}
						<Link to={ROUTES_NAMES.REGISTER}>REGISTER</Link>
					</p>
				</div>
			</Form>
		</Containerform>
	);
}

export default LoginForm;
