import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		flag: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
