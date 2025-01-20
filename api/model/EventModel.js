import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },
    medias: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: { 
      type: String, 
      unique: true 
    },
    author:{
      type: String,
      default: "Sov Etude"
    }
    
  },
  { timestamps: true }
);


const Event = mongoose.model("Evenement", eventSchema);
export default Event;
