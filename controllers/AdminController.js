const { login, register } = require('../repositories/AdminRepository');
const { handleOk } = require('../helpers/dbHelper');

class AdminController {

	login({ body }, res) {
		handleOk(res, login(body));
	}

	register({ body }, res) {
		handleOk(res, register(body));
	}
}

module.exports = new AdminController();
