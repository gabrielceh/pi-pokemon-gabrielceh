const bcrypt = require('bcrypt');

const { User } = require('../db');
const CustomError = require('../classes/CustomError');

const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		const emailFinded = await User.findOne({ where: { email: email.toLowerCase() } });

		if (emailFinded) throw new CustomError(400, 'Email is already in the data base');

		const user = await User.create({ email: email.toLowerCase(), password });

		const { email: emailDB, userId } = user.dataValues;

		res.status(200).json({
			access: true,
			user: { email: emailDB, userId },
			error: null,
		});
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email: email.toLowerCase() } });

		if (!user) {
			throw new CustomError(400, 'Email or Password not valid');
		}

		const comparePass = await bcrypt.compare(password, user.password);

		if (!comparePass) throw new CustomError(400, 'Email or Password not valid');

		const { email: emailDB, userId } = user.dataValues;

		return res.status(200).json({
			access: true,
			user: { email: emailDB, userId },
			error: null,
		});
	} catch (error) {
		console.log(error);
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

module.exports = {
	register,
	login,
};
