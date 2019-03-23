const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema(
	{
		login: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		myFavourite: [{
			type: mongoose.Schema.Types.ObjectId, ref: 'Radio'
		}]
	},
	{
		collection: "admins",
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updateAt"
		}
	}
);

const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;
