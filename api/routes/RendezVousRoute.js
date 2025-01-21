import express from "express";
import { VerifyAdmin } from "../middleware/verifyAdmin.js";
import { addRendezVous, getAllRendezVous } from "../controller/RendezController.js";

const router = express.Router();

router.post("/new", addRendezVous );
router.get("/",VerifyAdmin, getAllRendezVous);

export default router;
