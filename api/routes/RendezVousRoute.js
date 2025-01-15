import express from "express";
import { AjouterRendezVous, getAllRendezVous } from "../controllers/rendez-vous/RendezController.js";

const router = express.Router();

router.post("/ajouter", AjouterRendezVous);
router.get("/all", getAllRendezVous);

export default router;
