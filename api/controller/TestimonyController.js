import { errorHandler } from "../../config/errorHandler.js";
import Testimony from "../../models/TestimonyModel.js";

export const addTestimony = async (req, res, next) => {
  try {
    const { medias = "", message = "", author = "", category = "" } = req.body;

    // Créer un nouveau témoignage avec les champs disponibles
    const newTestimony = new Testimony({
      medias,
      message,
      author,
      category
    });

    await newTestimony.save();

    res.status(201).json({
      message: "Témoignage ajouté avec succès",
      testimony: newTestimony,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};

export const getAllTestimony = async (req, res, next) => {
  try {
    // Récupérer tous les témoignages
    const testimonies = await Testimony.find();

    // Vérifier si aucun témoignage n'est trouvé
    if (testimonies.length === 0) {
      return res.status(404).json({
        message: "Aucun témoignage trouvé.",
      });
    }

    // Si des témoignages sont trouvés, les renvoyer
    res.json({
      success: true,
      testimonies,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
}

export const markTestimony = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Rechercher le témoignage par son ID
    const testimony = await Testimony.findById(id);

    // Vérifier si le témoignage existe
    if (!testimony) {
      return res.status(404).json({ message: "Témoignage introuvable." });
    }

    // Basculer la valeur de `action`
    testimony.action = !testimony.action;

    // Sauvegarder les changements
    await testimony.save();

    res.status(200).json({
      message: `Le champ 'action' a été mis à jour à ${testimony.action}.`,
      testimony,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};


export const deleteTestimony = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTestimony = await Testimony.findByIdAndDelete(id);

    // Vérifier si le témoignage a été trouvé
    if (!deletedTestimony) {
      return res.status(404).json({ message: "Témoignage introuvable" });
    }

    // Si le témoignage a été supprimé, renvoyer un message de confirmation
    res.status(200).json({
      message: "Témoignage supprimé avec succès",
      testimony: deletedTestimony,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};

export const updateTestimony = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { medias, message, author, category, action } = req.body;

    const updatedTestimony = await Testimony.findByIdAndUpdate(
      id,
      { medias, message, author, category, action },
      { new: true }
    );

    if (!updatedTestimony) {
      return res.status(404).json({ message: "Témoignage introuvable" });
    }

    res.status(200).json({
      message: "Témoignage mis à jour avec succès",
      testimony: updatedTestimony,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};
