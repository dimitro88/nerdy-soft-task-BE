const mongoose = require("mongoose");
const { Schema } = mongoose;

const radioSchema = new Schema(
	{
		name: { type: String, required: true },
		url: { type: String, required: true, unique: true },
		frequency: { type : String },
		photo: { type: String }
	},
	{
		collection: "radios",
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updateAt"
		}
	}
);

const RadioModel = mongoose.model("Radio", radioSchema);
module.exports = RadioModel;
