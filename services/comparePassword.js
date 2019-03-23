const bcrypt = require('bcrypt');
const CustomError = require("../errors/CustomError");
const { errorFile } = require('../constants/errorsMessagesConstants');

const comparePassword = (password, hashedPassword) => {
	try {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, hashedPassword, function (err, result) {
				if (err) {
					reject(err.message);
				} else {
					resolve(result);
				}
			});
		})
	} catch (err) {
		return new CustomError(errorFile + __dirname + __filename);
	}
};

module.exports = comparePassword;
