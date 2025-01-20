import express from "express";
import { VerifyAdmin } from "../middleware/verifyAdmin.js";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controller/EventController.js";

const router = express.Router();

router.post("/new", VerifyAdmin, addEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.delete("/:id/delete", VerifyAdmin, deleteEvent);
router.delete("/:id/update", VerifyAdmin, updateEvent);

export default router;
