import express from "express";
import Blog from "../models/Blog.js";
import { verifyToken } from "../middleware/auth.js";
import admin from "../firebase.js";

const router = express.Router();

// Get current user's favorites FIRST (place before "/:id")
router.get("/me/favorites", verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ favorites: req.user.uid }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Public: list all blogs
router.get("/", async (_req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Public: get one blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch {
    res.status(400).json({ message: "Invalid id" });
  }
});

// Protected: create blog
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, content, image } = req.body;

    // Fetch user details from Firebase to get display name
    let authorName = 'Anonymous';
    try {
      const userRecord = await admin.auth().getUser(req.user.uid);
      authorName = userRecord.displayName ||
                   (userRecord.email ? userRecord.email.split('@')[0] : 'Anonymous');
    } catch (userError) {
      console.log('Could not fetch user details:', userError.message);
      // Fallback to email from token if available
      authorName = req.user.email ? req.user.email.split('@')[0] : 'Anonymous';
    }

    const blog = await Blog.create({
      title,
      content,
      image,
      authorUid: req.user.uid,
      authorName: authorName
    });
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).json({ message: "Invalid payload" });
  }
});

// Protected: add favorite
router.post("/:id/favorite", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { favorites: req.user.uid } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch {
    res.status(400).json({ message: "Invalid id" });
  }
});

// Protected: remove favorite
router.delete("/:id/favorite", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $pull: { favorites: req.user.uid } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch {
    res.status(400).json({ message: "Invalid id" });
  }
});

export default router;
