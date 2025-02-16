import Joi from "joi";
import errorHandler from "../utils/Error.js";
import Destination from "../model/DestinationModel.js";

// Joi validation schema for new destinations
const destinationSchemaJoi = Joi.object({
  title: Joi.string().required(),
  continent: Joi.string().required(),
  image: Joi.string().required(),
  shortDescription: Joi.string().required(),
  fullDescription: Joi.string().required(),
});


// Controller to add a new destination
export const newDestination = async (req, res, next) => {
  const { error } = destinationSchemaJoi.validate(req.body);
  if (error) {
    return next(
      errorHandler(400, error.details[0].message || "Invalid destination")
    );
  }

  const { title, continent, image, shortDescription, fullDescription } = req.body;

  try {
    const newDestination = new Destination({
      title,
      continent,
      image,
      shortDescription,
      fullDescription,
    });

    await newDestination.save();
    return res.status(201).json({
      message: "Destination ajoutée avec succès.",
      destination: newDestination,
    });
  } catch (error) {
    next(errorHandler(500, "Erreur lors de l'ajout de la destination"));
  }
};


// Controller to fetch all destinations
export const getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find();
	
    if (destinations.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Aucune destination trouvée.",
      });
    }
    return res.status(200).json({ destinations });
  } catch (error) {
    next(errorHandler(500, "Erreur serveur"));
  }
};

// Controller to fetch a specific destination by title
export const getDestinationByTitle = async (req, res, next) => {
  const title = req.params.title;

  try {
    const destination = await Destination.findOne({ title });
    if (!destination) {
      return next(errorHandler(404, "Destination non trouvée"));
    }
    return res.json({ destination });
  } catch (error) {
    next(errorHandler(500, "Erreur serveur"));
  }
};

// Controller to update an existing destination
export const updateDestination = async (req, res, next) => {
  const title = req.params.title;
  const { error } = destinationSchemaJoi.validate(req.body);
  if (error) {
    return next(errorHandler(400, error.details[0].message));
  }

  try {
    const updatedDestination = await Destination.findOneAndUpdate(
      { title },
      req.body,
      { new: true }
    );

    if (!updatedDestination) {
      return next(errorHandler(404, "Destination non trouvée"));
    }

    return res.json({ updatedDestination });
  } catch (error) {
    next(errorHandler(500, "Erreur serveur"));
  }
};

// Controller to delete a destination by title
export const deleteDestination = async (req, res, next) => {
  const title = req.params.title;
  try {
    const deletedDestination = await Destination.findOneAndDelete({ title });

    if (!deletedDestination) {
      return next(errorHandler(404, "Destination non trouvée"));
    }

    return res.status(200).json({
      message: "Destination supprimée avec succès.",
      deletedDestination,
    });
  } catch (error) {
    next(errorHandler(500, "Erreur serveur"));
  }
};
