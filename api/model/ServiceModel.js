import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    medias: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Études", "Tourisme", "Évacuation Sanitaire", "Travail"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
