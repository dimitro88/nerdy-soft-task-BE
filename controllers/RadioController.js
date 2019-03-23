const {
	getListOfRadioStations,
	createNewStation,
	editStation,
	removeStation,
	stationAutocomplete,
	addToFavourite
} = require('../repositories/RadioRepository');
const { handleOk } = require('../helpers/dbHelper');

class RadioController {

	getListOfRadioStations(req, res) {
		handleOk(res, getListOfRadioStations());
	}

	createNewStation({ body }, res) {
		handleOk(res, createNewStation(body));
	}

	editStation({ body, params: { id } }, res) {
		handleOk(res, editStation(id, body));
	}

	removeStation({ params: { id }}, res) {
		handleOk(res, removeStation(id));
	}

	stationAutocomplete({ params: { name } }, res) {
		handleOk(res, stationAutocomplete(name));
	}

	addToFavourite({ body, params: { id }}, res) {
		handleOk(res, addToFavourite(id, body));
	}

}

module.exports = new RadioController();
