import { errorHandler } from "../../config/errorHandler.js";
import Post from "../models/PostModel.js";

export const newPost = async (req, res, next) => {
  const { title, content, medias, tags } = req.body;

  if (!title || !content || !medias || !tags) {
    return res.status(400).json({
      success: false,
      message: "Veuillez fournir tous les champs requis",
    });
  }

  try {
    const newPost = new Post({
      title,
      content,
      medias,
      tags,
    });
    await newPost.save();
    return res.status(200).json({
      success: true,
      message: "Nouvel Post créé avec succès",
      post: newPost,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur Server"));
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur Server"));
  }
};


export const getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur Server"));
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, medias, tags } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, medias, tags },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post mis à jour avec succès",
      post: updatedPost,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur Server"));
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    //vérifier
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post supprimé avec succès",
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur Server"));
  }
};

export const markPosts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post introuvable." });
    }

    post.public = !post.public;

    await post.save();

    res.status(200).json({
      message: `Le champ 'public' a été mis à jour à ${post.public}.`,
      post,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};
