const Admin = require('../models/AdminModel');

const hashPassword = require('../helpers/cryptoHelper');
const comparePassword = require('../services/comparePassword');
const generateToken = require('../helpers/generateToken');
const CustomError = require('../errors/CustomError');

const { badPassword, badLogin } = require('../constants/errorsMessagesConstants');
const { registerSuccess, authenticationSuccess } = require('../constants/succesMessagesConstants');

class AdminRepository {

	async login({ login, password }) {
		try {
			let logAdmin = await Admin.find({ login: login }).exec();
			if (logAdmin.length === 1) {
				if (await comparePassword(password, logAdmin[0].password)) {
					const token = generateToken(login);
					return {
						success: true,
						message: authenticationSuccess,
						token: token,
						admin: logAdmin[0]
					}
				}
				else {
					throw new CustomError(badPassword);
				}
			}
			else {
				throw new CustomError(badLogin);
			}
		} catch (error) {
			throw new CustomError(error);
		}
	}

	async register(userBody) {
		try {
			await hashPassword(userBody);
			const admin = new Admin(userBody);
			await admin.save();
			return {
				success: true,
				message: registerSuccess,
				admin
			};
		} catch (error) {
			throw new CustomError(error.message);
		}
	}

}

module.exports = new AdminRepository();