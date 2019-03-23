const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(userBody){
	return new Promise((resolve, reject) => {
		bcrypt.hash(userBody.password, saltRounds, (err, hash) => {
			if(err) {
				reject(err.message);
			}
			userBody.password = hash;
			resolve();
		})
	})
}

module.exports = hashPassword;