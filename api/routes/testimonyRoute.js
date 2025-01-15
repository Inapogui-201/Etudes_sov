import express from "express";
import { addTestimony, deleteTestimony, getAllTestimony, markTestimony, updateTestimony } from "../controllers/Testimony/TestimonyController.js";
import { verifyAdmin } from "../middleware/verify.js";

const router = express.Router();

router.post("/new", addTestimony);
router.get("/", verifyAdmin,getAllTestimony);
router.patch('/:id/mark',verifyAdmin, markTestimony);
router.delete('/:id/delete',verifyAdmin, deleteTestimony);
router.put('/:id/update',verifyAdmin, updateTestimony);




export default router;