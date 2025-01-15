import express from "express";
import Joi from "joi";
import RendezVous from "../../models/RendezModel.js";
import errorHandler from "../../config/errorHandler.js";





// Joi schema for validation
const RendezVousSchema = Joi.object({
	fullname: Joi.string().required(),
	number: Joi.string().required(),
	email: Joi.string().email().required(),
	dateRendez: Joi.date().required(),
});

// Function to add a new appointment
export const AjouterRendezVous = async (req, res, next) => {
	const { error } = RendezVousSchema.validate(req.body);
	if (error) {
		return next(errorHandler(400, error.details[0].message));
	}

	const { fullname, number, email, dateRendez } = req.body;
	try {
		const newRendezVous = new RendezVous({
			fullname,
			number,
			email,
			dateRendez,
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
		const rendezVous = await RendezVous.find();
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
