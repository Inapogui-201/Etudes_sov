import express from "express";
import { VerifyAdmin } from "../middleware/verifyAdmin.js";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventBySlug,
  updateEvent,
} from "../controller/EventController.js";

const router = express.Router();

router.post("/new", VerifyAdmin, addEvent);
router.get("/", getAllEvents);
//router.get("/:id", getEventById);
router.get("/:slug", getEventBySlug);
router.delete("/:id/delete", VerifyAdmin, deleteEvent);
router.patch("/:id/update", VerifyAdmin, updateEvent);

export default router;
