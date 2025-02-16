import express from "express";
import { newDestination, getAllDestinations, deleteDestination, updateDestination } from "../controllers/destination/DestinationController.js";
import { addTestimony, getAllTestimony, markTestimony, deleteTestimony, updateTestimony } from "../controllers/Testimony/TestimonyController.js";
import { newPost, getPosts, getPostById, updatePost, deletePost, markPosts } from "../controllers/posts/PostController.js";
import { verifyAdmin } from "../middleware/verify.js";

const router = express.Router();

// Destination routes
router.post("/destination/new", verifyAdmin, newDestination);
router.get("/destination", verifyAdmin, getAllDestinations);
router.put("/destination/:title", verifyAdmin, updateDestination);
router.delete("/destination/:title", verifyAdmin, deleteDestination);

// Testimony routes
router.post("/testimony/new", verifyAdmin, addTestimony);
router.get("/testimony", verifyAdmin, getAllTestimony);
router.patch("/testimony/:id/mark", verifyAdmin, markTestimony);
router.put("/testimony/:id/update", verifyAdmin, updateTestimony);
router.delete("/testimony/:id/delete", verifyAdmin, deleteTestimony);

// Post routes
router.post("/post/new", verifyAdmin, newPost);
router.get("/post", verifyAdmin, getPosts);
router.get("/post/:id", verifyAdmin, getPostById);
router.put("/post/:id/update", verifyAdmin, updatePost);
router.delete("/post/:id/delete", verifyAdmin, deletePost);
router.patch("/post/:id/mark", verifyAdmin, markPosts);

export default router;
