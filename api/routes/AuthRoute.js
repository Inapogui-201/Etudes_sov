import express from "express";
import { signIn, signOut, signUp, updateProfile } from "../controller/AuthController.js";
import { VerifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.post("/auth/signout", signOut);
router.patch("/update-profile", VerifyAdmin, updateProfile)




export default router;