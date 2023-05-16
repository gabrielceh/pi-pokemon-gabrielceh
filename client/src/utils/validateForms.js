const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[*_\-.#$])[A-Za-z\d*_\-.#$]{8,16}$/;
const NAME_REGEX = /^[a-zA-Z0-9]+$/;

const imageTypes = (type) => {
	let types = {
		'image/png': 'png',
		'image/jpeg': 'jpg',
		'image/svg+xml': 'svg',
		'image/webp': 'webp',
	};

	return types.hasOwnProperty(type);
};

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

const validateCreateForm = (form) => {
	const errors = {};

	if (!form.name.trim()) errors.name = 'Enter a name';
	else if (!NAME_REGEX.test(form.name))
		errors.name = 'Name must only contain alphanumeric characters';

	if (form.image && imageTypes(form.image.type) === false)
		errors.image = 'Invalid format. Only: .png, .jpg, .svg, .webp';

	if (!form.hp.trim()) errors.hp = 'Enter hp';
	else if (isNaN(form.hp)) errors.hp = 'Hp must be a number';
	else if (+form.hp < 1 || +form.hp > 255) errors.hp = 'Hp must be a number between 1 and 255';

	if (!form.attack.trim()) errors.attack = 'Enter Attack';
	else if (isNaN(form.attack)) errors.attack = 'Attack must be a number';
	else if (+form.attack < 1 || +form.attack > 255)
		errors.attack = 'Attack must be a number between 1 and 255';

	if (!form.defense.trim()) errors.defense = 'Enter Defense';
	else if (isNaN(form.defense)) errors.defense = 'Defense must be a number';
	else if (+form.defense < 1 || +form.defense > 255)
		errors.defense = 'Defense must be a number between 1 and 255';

	if (!form.special_attack.trim()) errors.special_attack = 'Enter Special Attack';
	else if (isNaN(form.special_attack)) errors.special_attack = 'Special Attack must be a number';
	else if (+form.special_attack < 1 || +form.special_attack > 255)
		errors.special_attack = 'Special Attack must be a number between 1 and 255';

	if (!form.special_defense.trim()) errors.special_defense = 'Enter Special Defense';
	else if (isNaN(form.special_defense)) errors.special_defense = 'Special Defense must be a number';
	else if (+form.special_defense < 1 || +form.special_defense > 255)
		errors.special_defense = 'Special Defense must be a number between 1 and 255';

	if (!form.speed.trim()) errors.speed = 'Enter Speed';
	else if (isNaN(form.speed)) errors.speed = 'Speed must be a number';
	else if (+form.speed < 1 || +form.speed > 255)
		errors.speed = 'Speed must be a number between 1 and 255';

	if (form.weight && isNaN(form.weight)) errors.weight = 'Weight must be a number';
	else if ((form.weight && +form.weight < 0.01) || +form.weight > 999)
		errors.weight = 'Weight must be a number between 0.01 and 999';

	if (form.height && isNaN(form.height)) errors.height = 'Height must be a number';
	else if ((form.height && +form.height < 0.01) || +form.height > 999)
		errors.height = 'Height must be a number between 0.01 and 999';

	if (!form.types.length) errors.types = 'Please, choose a type';
	else if (form.types.length > 2) errors.types = 'Max 2 types';

	return errors;
};

const validateEdit = (form) => {
	const errors = {};

	if (!form.name.trim()) errors.name = 'Enter a name';
	else if (form.name && !NAME_REGEX.test(form.name))
		errors.name = 'Name must only contain alphanumeric characters';

	if (!form.hp) errors.hp = 'Enter hp';
	else if (form.hp && isNaN(form.hp)) errors.hp = 'Hp must be a number';
	else if ((form.hp && +form.hp < 1) || +form.hp > 255)
		errors.hp = 'Hp must be a number between 1 and 255';

	if (!form.attack) errors.attack = 'Enter Attack';
	else if (form.attack && isNaN(form.attack)) errors.attack = 'Attack must be a number';
	else if ((form.attack && +form.attack < 1) || +form.attack > 255)
		errors.attack = 'Attack must be a number between 1 and 255';

	if (!form.defense) errors.defense = 'Enter Defense';
	else if (form.defense && isNaN(form.defense)) errors.defense = 'Defense must be a number';
	else if ((form.defense && +form.defense < 1) || +form.defense > 255)
		errors.defense = 'Defense must be a number between 1 and 255';

	if (!form.special_attack) errors.special_attack = 'Enter Special Attack';
	else if (form.special_attack && isNaN(form.special_attack))
		errors.special_attack = 'Special Attack must be a number';
	else if ((form.special_attack && +form.special_attack < 1) || +form.special_attack > 255)
		errors.special_attack = 'Special Attack must be a number between 1 and 255';

	if (!form.special_defense) errors.special_defense = 'Enter Special Defense';
	else if (form.special_defense && isNaN(form.special_defense))
		errors.special_defense = 'Special Defense must be a number';
	else if ((form.special_defense && +form.special_defense < 1) || +form.special_defense > 255)
		errors.special_defense = 'Special Defense must be a number between 1 and 255';

	if (!form.speed) errors.speed = 'Enter Speed';
	else if (form.speed && isNaN(form.speed)) errors.speed = 'Speed must be a number';
	else if ((form.speed && +form.speed < 1) || +form.speed > 255)
		errors.speed = 'Speed must be a number between 1 and 255';

	if (form.weight && isNaN(form.weight)) errors.weight = 'Weight must be a number';
	else if ((form.weight && +form.weight < 0.01) || +form.weight > 999)
		errors.weight = 'Weight must be a number between 0.01 and 999';

	if (form.height && isNaN(form.height)) errors.height = 'Height must be a number';
	else if ((form.height && +form.height < 0.01) || +form.height > 999)
		errors.height = 'Height must be a number between 0.01 and 999';

	if (form.types && !form.types.length) errors.types = 'Please, choose a type';
	else if (form.types.length > 2) errors.types = 'Max 2 types';

	return errors;
};

export { validateLoginForm, validateRegisterForm, validateCreateForm, validateEdit, imageTypes };
