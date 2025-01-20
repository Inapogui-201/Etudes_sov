import express from "express";
import { VerifyAdmin } from "../middleware/verifyAdmin.js";
import { addTestimony, deleteTestimony, getAllTestimony, markTestimony, updateTestimony } from "../controller/TestimonyController.js";

const router = express.Router();

router.post("/new", addTestimony);
router.get("/all",getAllTestimony);
router.get("/",VerifyAdmin,getAllTestimony);

router.patch('/:id/mark',VerifyAdmin, markTestimony);
router.delete('/:id/delete',VerifyAdmin, deleteTestimony);
router.put('/:id/update',VerifyAdmin, updateTestimony);




export default router;