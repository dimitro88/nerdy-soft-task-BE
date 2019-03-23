const checkToken = require('./checkToken');
const {
	login,
	register
} = require('../controllers/AdminController');
const {
	getListOfRadioStations,
	createNewStation,
	editStation,
	removeStation,
	stationAutocomplete,
	addToFavourite
} = require('../controllers/RadioController');

function initEdnpoints(app) {

	app.post('/register', (req, res) => {
		register(req, res)
	});

	app.post('/login', (req ,res) => {
		login(req, res)
	});

	app.get('/get-list-of-radio-stations', (req, res) => {
		getListOfRadioStations(req, res)
	});

	app.post('/create-new-station', checkToken, (req, res) => {
		createNewStation(req, res)
	});

	app.put('/edit-station-by-id/:id', checkToken, (req, res) => {
		editStation(req, res)
	});

	app.delete('/remove-station-by-id/:id', checkToken, (req, res) => {
		removeStation(req, res)
	});

	app.put('/add-to-favourite/:id', checkToken, (req, res) => {
		addToFavourite(req, res)
	});

	app.get('/station-autocomplete/:name', (req, res) => {
		stationAutocomplete(req, res)
	})

}

module.exports = initEdnpoints;