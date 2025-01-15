import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  motif: {
    type: String,
    enum: ["Etudes", "Tourisme", "Evacuation Sanitaire", "Travail"],
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message:{
    type: String,
    required: true,
  },
  read:{
    type: Boolean,
    default: false,
  }

}, {timeseries: true});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;