import express from "express";
import { getAllContacts, markContactRead, newContact, sendMail } from "../controllers/contact/ContactController.js";
import { verifyAdmin } from "../middleware/verify.js";


const router = express.Router();

router.post("/new", newContact)
router.post("/send", sendMail);
router.get("/", verifyAdmin, getAllContacts);
router.patch("/:id/read", verifyAdmin, markContactRead);

export default router;
