const mongoose = require("mongoose");
const express = require("express");

const initEdnpoints = require('./middleware/initEdnpoints');

const { localDB, port } = require("./config");

const app = express();

mongoose
	.connect(
		localDB,
		{ useNewUrlParser: true, useCreateIndex: true }
	)
	.catch(err => {
	console.error(err);
	process.exit(1);
});
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-Width, Content-Type, Accept, Authorization"
	);
	res.header(
		"Access-Control-Allow-Credentials",
		true
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	next();
});

app.listen(port);
initEdnpoints(app);

console.log(`all okay`);
console.log(`server start on port: ${port}`);
console.log(`address in browser: localhost:${port}`);

module.exports = app;
