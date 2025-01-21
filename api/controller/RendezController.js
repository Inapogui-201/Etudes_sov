import Joi from "joi";
import Appointment from "../model/RendezModel.js";
import errorHandler from "../utils/Error.js";

// Joi schema for validation
const RendezVousSchema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.date().required(),
  message: Joi.string().required(),
  service: Joi.string().required(),
});

// Function to add a new appointment
export const addRendezVous = async (req, res, next) => {
  const { error } = RendezVousSchema.validate(req.body);
  if (error) {
    return next(errorHandler(400, error.details[0].message));
  }

  const { fname, lname, email, phone, message, service } = req.body;
  try {
    const newRendezVous = new Appointment({
      fname,
      lname,
      email,
      phone,
      message,
      service,
    });

    await newRendezVous.save();
    return res.status(201).json({
      message: "Votre rendez-vous a été pris avec succès.",
      rendezVous: newRendezVous,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};

// Function to get all appointments
export const getAllRendezVous = async (req, res, next) => {
  try {
    const rendezVous = await Appointment.find();
    if (rendezVous.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun rendez-vous trouvé.",
      });
    }
    res.json({
      success: true,
      rendezVous,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};
