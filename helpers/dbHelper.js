module.exports = {
	handleOk(res, promise) {
		promise
			.then(data => {
				res.send(data);
			})
			.catch(error => {
				res.status(error.status);
				res.send(error);
			});
	}
};