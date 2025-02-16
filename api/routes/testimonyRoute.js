import express from "express";
import { VerifyAdmin } from "../middleware/verifyAdmin.js";
import { addTestimony, deleteTestimony, getAllTestimony, markTestimony, updateTestimony } from "../controller/TestimonyController.js";

const router = express.Router();


router.get("/all",getAllTestimony);
router.post("/new",VerifyAdmin, addTestimony);
router.get("/",getAllTestimony);
router.patch('/:id/mark',VerifyAdmin, markTestimony);
router.delete('/:id/delete',VerifyAdmin, deleteTestimony);
router.patch('/:id/update',VerifyAdmin, updateTestimony);


export default router;