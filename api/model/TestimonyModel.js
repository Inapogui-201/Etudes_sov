import mongoose from "mongoose";

const testimonySchema = new mongoose.Schema(
  {
    medias: {
      type: String,
      default:"",
     
    },
    message: {
    type: String,
     default: ""
    },
    author: {
      type: String,
      default: "",
    },
    category:{
      type: String,
      enum: ["video", "text"],
    },
    action:{
      type:Boolean,
      default: false,
    }
  },
  { timeseries: true }
);

const Testimony = mongoose.model("Testimony", testimonySchema);
export default Testimony;
