const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');
const { secret } = require('../config');
const { badToken, badAuthHeaderFormat, noAuthHeader } = require('../constants/errorsMessagesConstants');

function checkToken(req, res, next) {
	try {
		let token = null;
		console.log(req.headers);
		if (req.headers['authorization']) {
			if(req.headers['authorization'].startsWith('JWT ')) {
				token = req.headers['authorization'].split(' ')[1];
			}
			if (token) {
				jwt.verify(token, secret, (err, decoded) => {
					if (err) {
						throw new ForbiddenError(badToken);
					} else {
						req.decoded = decoded;
						next();
					}
				});
			} else {
				throw new ForbiddenError(badAuthHeaderFormat);
			}
		} else {
			throw new ForbiddenError(noAuthHeader);
		}
	} catch(error) {
		console.log(error.message);
		res.status(error.status);
		res.send(error);
	}
}

module.exports = checkToken;