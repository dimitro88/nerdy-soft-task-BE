const Radio = require('../models/RadioModel');
const CustomError = require('../errors/CustomError');
const Admin = require('../models/AdminModel');

class RadioRepository {

	async getListOfRadioStations() {
		try {
		 return await Radio.find();
		} catch (err) {
			throw new CustomError(err.message);
		}
	}

	async createNewStation(stationBody) {
		try {
			const radio = new Radio(stationBody);
			return await radio.save();
		} catch (err) {
			throw new CustomError(err.message);
		}
	}

	async editStation(stationID, stationBody) {
		try {
			console.log(stationID, stationBody);
			return await Radio.findByIdAndUpdate(stationID, stationBody, { new: true });
		} catch (err) {
			throw new CustomError(err.message);
		}
	}

	async removeStation(stationID) {
		try {
			return await Radio.findByIdAndRemove(stationID);
		} catch (err) {
			throw new CustomError(err.message);
		}
	}

	async stationAutocomplete(name) {
		try {
			return await Radio.find({name: new RegExp(name, 'i')});
		} catch (err) {
			throw new CustomError(err.message);
		}
	}

	async addToFavourite(radio_ID, { admin_ID }) {
		const admin = await Admin.findById(admin_ID);
		if(admin.myFavourite.every(favourite => favourite.toString() !== radio_ID.toString()) === false) {
			admin.myFavourite = admin.myFavourite.filter(favourite => favourite.toString() !== radio_ID.toString());
			await admin.save();
			return {
				admin,
				message: 'Successfully removed from favourite'
			}
		} else if (admin.myFavourite.every(favourite => favourite.toString() !== radio_ID.toString()) === true) {
			admin.myFavourite.push(radio_ID);
			await admin.save();
			return {
				admin,
				message: 'Successfully added to favourite'
			}
		}
	}

}

module.exports = new RadioRepository();