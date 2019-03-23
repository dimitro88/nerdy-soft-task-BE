module.exports = class ForbiddenError extends Error {
	constructor(message = null, status = 400) {
		super();
		this.status = status;
		this.code = 'Custom error';
		this.message = message;
	}
};