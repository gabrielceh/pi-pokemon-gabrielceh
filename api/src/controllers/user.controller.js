const bcrypt = require('bcrypt');

const { User } = require('../db');
const CustomError = require('../classes/CustomError');
const { generateToken } = require('../utils/generateToken');
const { getBlackList, saveTokenInBlackList } = require('../services/blacklist.service');

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

		const { token, expireIn } = generateToken(userId, emailDB, res);

		return res.status(200).json({
			access: true,
			user: { email: emailDB, userId },
			auth_token: {
				token,
				expireIn,
			},
			error: null,
		});
	} catch (error) {
		console.log(error);
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const logout = async (req, res) => {
	const blacklistSet = await getBlackList();
	const blacklist = new Set(blacklistSet);
	try {
		let auth_token = req.cookies.auth_token;

		if (!auth_token) throw new CustomError(400, 'No token');

		blacklist.add(auth_token);
		await saveTokenInBlackList(blacklist);

		res.clearCookie('auth_token');
		res.status(200).json({
			access: false,
			user: null,
			auth_token: null,
			error: null,
		});
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

module.exports = {
	register,
	login,
	logout,
};
