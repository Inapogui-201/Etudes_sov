import Joi from "joi";
import Event from "../model/EventModel.js";
import errorHandler from "../utils/Error.js";

// Joi validation schema for new events
const eventSchemaJoi = Joi.object({
  title: Joi.string().required(),
  medias: Joi.string().required(),
  content: Joi.string().required(),
});


const generateSlug = (title) => {
  return title
    .toLowerCase() 
    .trim() 
    .replace(/[^\w\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-'); 
};

export const addEvent = async (req, res, next) => {
  const { error } = eventSchemaJoi.validate(req.body);
  if (error) {
    return next(errorHandler(400, error.details[0].message || "Invalid Event"));
  }

  const { title, medias, content } = req.body;

    // Générer le slug à partir du titre
    const slug = generateSlug(title);

  try {
    const newEvent = new Event({
      title,
      medias,
      content,
      slug,
    });

    await newEvent.save();

    // Corrected response format
    res.status(201).json({
      message: "Événement ajouté avec succès",
      event: newEvent,
    });
    
  } catch (error) {
    next(errorHandler(500, "Erreur lors de l'ajout de l'événement"));
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();

    // Si aucun événement n'est trouvé
    if (events.length === 0) {
      return res.status(200).json({ message: "Aucun événement à afficher" });
    }

    // Si des événements sont trouvés, les renvoyer
    res.status(200).json(events);
  } catch (error) {
    next(errorHandler(500, "Erreur lors de la récupération des événements"));
  }
};


export const getEventById = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const event = await Event.findById(id);
    if (!event) {
      return next(errorHandler(404, "Événement non trouvé"));
    }
    res.status(200).json(event);
  } catch (error) {
    next(errorHandler(500, "Erreur lors de la récupération de l'événement"));
  }
};

export const updateEvent = async (req, res, next) => {
  const { id } = req.params;
  const { title, medias, content } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { title, medias, content }, { new: true });
    if (!updatedEvent) {
      return next(errorHandler(404, "Événement non trouvé"));
    }
    res.status(200).json({
      message: "Événement mis à jour avec succès",
      event: updatedEvent,
    });
  } catch (error) {
    next(errorHandler(500, "Erreur lors de la mise à jour de l'événement"));
  }
};

export const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return next(errorHandler(404, "Événement non trouvé"));
    }
    res.status(200).json({ message: "Événement supprimé avec succès" });
  } catch (error) {
    next(errorHandler(500, "Erreur lors de la suppression de l'événement"));
  }
};
