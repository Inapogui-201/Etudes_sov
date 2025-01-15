import Joi from "joi";
import Destination from "../../models/DestinationModel.js";

// Joi validation schema for new destinations
const destinationSchemaJoi = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	image: Joi.string().uri().required(),
});

// Error handler function
const errorHandler = (status, message) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

// Controller to add a new destination
export const newDestination = async (req, res, next) => {
	const { error } = destinationSchemaJoi.validate(req.body);
	if (error) {
		return next(errorHandler(400, error.details[0].message));
	}

	const { title, description, image } = req.body;

	try {
		const newDestination = new Destination({
			title,
			flag: image,
			content: description,
		});

		await newDestination.save();
		return res.status(201).json({
			message: "Destination ajoutée avec succès.",
			destination: newDestination,
		});
	} catch (error) {
		next(errorHandler(500, "Erreur serveur"));
	}
};

// Controller to fetch all destinations with pagination
export const getAllDestinations = async (req, res, next) => {
	const { page = 1, limit = 10 } = req.query;
	try {
		const destinations = await Destination.find()
			.skip((page - 1) * limit)
			.limit(parseInt(limit));

		const total = await Destination.countDocuments();

		if (destinations.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Aucune destination trouvée.",
			});
		}

		res.json({
			success: true,
			total,
			page: parseInt(page),
			limit: parseInt(limit),
			destinations,
		});
	} catch (error) {
		next(errorHandler(500, "Erreur serveur"));
	}
};

// Controller to fetch a specific destination by title
export const getDestinationByTitle = async (req, res, next) => {
	const title = req.params.title;

	if (!title) {
		return res.status(400).json({
			success: false,
			message: "Title parameter is required.",
		});
	}

	try {
		console.log("Searching for destination with title:", title);
		const destination = await Destination.findOne({
			title: { $regex: new RegExp(title, "i") }, // Case-insensitive search
		});
		if (!destination) {
			return res.status(404).json({
				success: false,
				message: "Destination non trouvée.",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Destination found:",
			destination,
		});
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

	const { description, image } = req.body;

	try {
		const destination = await Destination.findOneAndUpdate(
			{ title: new RegExp(`^${title}$`, "i") },
			{
				flag: image,
				content: description,
			},
			{ new: true }
		);

		if (!destination) {
			return res.status(404).json({
				success: false,
				message: "Destination non trouvée.",
			});
		}

		res.json({
			success: true,
			message: "Destination modifiée avec succès.",
			destination,
		});
	} catch (error) {
		next(errorHandler(500, "Erreur serveur"));
	}
};

// Controller to delete a destination by title
export const deleteDestination = async (req, res, next) => {
	const title = req.params.title;

	try {
		const deletedDestination = await Destination.findOneAndDelete({
			title: new RegExp(`^${title}$`, "i"), // Case-insensitive search for title
		});

		if (!deletedDestination) {
			return res.status(404).json({
				success: false,
				message: "Destination non trouvée.",
			});
		}

		res.json({
			success: true,
			message: "Destination supprimée avec succès.",
			destination: deletedDestination,
		});
	} catch (error) {
		next(errorHandler(500, "Erreur serveur"));
	}
};
