const { Blacklist } = require('../db');

const getBlackList = async (token) => {
	const tokens = await Blacklist.findAll();
	const blacklist = new Set(tokens.map((t) => t.token));
	return blacklist;
};

const saveTokenInBlackList = async (blacklist) => {
	console.log(blacklist);
	const tokens = [...blacklist].map((token) => ({ token }));
	console.log(tokens);
	await Blacklist.bulkCreate(tokens, {
		updateOnDuplicate: ['updatedAt'],
	});
};

module.exports = { getBlackList, saveTokenInBlackList };
