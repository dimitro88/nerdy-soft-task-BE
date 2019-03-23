module.exports = class ForbiddenError extends Error {
	constructor(message = "Forbidden error!") {
		super(message);
		this.status = 403;
		this.code = message;
	}
};
