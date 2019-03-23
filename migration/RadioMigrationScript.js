const mongoose = require('mongoose');
const Radio = require('../models/RadioModel');

const { localDB } = require('../config');

mongoose
	.connect(
		localDB,
		{ useNewUrlParser: true, useCreateIndex: true }
	)
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

const data = [
	{
		"name": "Русское радио - Україна",
		"url": "http://online-kissfm.tavrmedia.ua/KissFM",
		"photo": "http://www.kissfm.ua/static/img/KissFM_1200x630.png"
	},
	{
		"name": "Hit ФМ",
		"url": "http://online-hitfm.tavrmedia.ua/HitFM_HD",
		"photo": "https://www.hitfm.ua/static/img/HitFM_Playlist_avatar_1440x1080.png"
	},
	{
		"name": "Перець ФМ",
		"url": "http://radio.urg.ua/radio-stilnoe",
		"photo": "https://bestradio.fm/uploads/posts/2012-07/1342025241_perec_fm.jpg"
	}
];

async function saveData() {
	const radios = [];
	for (let item of data) {
		let radio = await new Radio(item);
		await radio.save();
		radios.push(radio);
	}
	return radios;
}

try {
	(async () => {
		await saveData();
		console.log('Done!\nPress CTRL + C to exit');
	})()
} catch(err) {
	throw new Error(err);
}