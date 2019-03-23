const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = login => {
	return jwt.sign(
		{ username: login },
		secret,
		{ expiresIn: '24h' }
	);
};