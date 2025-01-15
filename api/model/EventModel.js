import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    medias: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Evenement", eventSchema);
export default Event;
