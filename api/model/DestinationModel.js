import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    continent:{
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
