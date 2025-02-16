import express from "express";
import {
  deletePost,
  getPostById,
  getPosts,
  markPosts,
  newPost,
  updatePost,
} from "../controllers/posts/PostController.js";
import { verifyAdmin } from "../middleware/verify.js";

const router = express.Router();

router.post("/new", verifyAdmin,newPost);
router.get("/", getPosts);
router.get("/:id", verifyAdmin, getPostById);
router.patch("/:id/mark", verifyAdmin, markPosts);
router.put("/:id/update", verifyAdmin, updatePost);
router.delete("/:id/delete",verifyAdmin, deletePost);

export default router;
