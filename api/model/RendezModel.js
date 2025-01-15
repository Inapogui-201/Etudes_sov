import mongoose from "mongoose";

const RendezModel = new mongoose.Schema({
	fullname: {
		type: String,
		required: true
	},
	number: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	dateRendez: {
		type: Date,
		required: true,
	}
}, { timeseries: true });


const RendezVous = mongoose.model("Rendez-vous", RendezModel);

export default RendezVous;
