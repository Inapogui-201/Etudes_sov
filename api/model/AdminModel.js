import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    tel: {
        type: String,
        default:""
      },
    profil: {
      type: String,
      default:
        "https://res.cloudinary.com/do2qwucmp/image/upload/v1732312976/sovEtudes/zbhxyckxn6hd2qrveaaw.webp",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;