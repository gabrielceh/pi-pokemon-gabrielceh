const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[*_\-.#$])[A-Za-z\d*_\-.#$]{8,16}$/;

const validateLoginForm = (form) => {
	const errors = {};

	if (!form.email.trim()) errors.email = 'Enter a email';
	else if (!EMAIL_REGEX.test(form.email)) errors.email = 'Enter a valid Email';
	else if (form.email.length > 35) errors.email = "Email shouldn't have more than 35 characters";

	if (!form.password.trim()) errors.password = 'Enter a password';
	else if (!PASSWORD_REGEX.test(form.password))
		errors.password =
			'Password must be between 6 and 10 characters A least one number, a capitalize letter and one special character(*_-.#$)';
	else if (form.password.length < 8 || form.password.length > 16)
		errors.password = 'Password must be between 6 and 10 characters';

	return errors;
};

const validateRegisterForm = (form) => {
	const errors = {};

	if (!form.email.trim()) errors.email = 'Enter a email';
	else if (!EMAIL_REGEX.test(form.email)) errors.email = 'Enter a valid Email';
	else if (form.email.length > 35) errors.email = "Email shouldn't have more than 35 characters";

	if (!form.password.trim()) errors.password = 'Enter a password';
	else if (!PASSWORD_REGEX.test(form.password))
		errors.password =
			'Password must be between 6 and 10 characters A least one number, a capitalize letter and one special character(*_-.#$)';
	else if (form.password.length < 8 || form.password.length > 16)
		errors.password = 'Password must be between 6 and 10 characters';

	if (form.repeatPassword.trim() !== form.password.trim())
		errors.repeatPassword = 'Passwords are not equals';

	if (!form.userName.trim()) errors.userName = 'Enter a user name';
	return errors;
};

export { validateLoginForm, validateRegisterForm };
