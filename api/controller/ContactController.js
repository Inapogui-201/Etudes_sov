import { errorHandler } from "../../config/errorHandler.js";
import Contact from "../../models/ContactModel.js";
import Joi from "joi";
import nodemailer from "nodemailer";

// Validation Schema
const contactSchema = Joi.object({
  fname: Joi.string().required(),
  address: Joi.string().required(),
  motif: Joi.string().required(),
  number: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});

export const newContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return next(errorHandler(400, error.details[0].message));
  }

  const { fname, address, motif, number, email, message } = req.body;

  try {
    const newContact = new Contact({
      fname,
      address,
      motif,
      number,
      email,
      message,
    });

    await newContact.save();
    return res.status(201).json({
      message: "Votre message a été envoyé avec succès.",
      contact: newContact,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun contact trouvé.",
      });
    }

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};

export const markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(errorHandler(404, "Contact non trouvé"));
    }

    if (contact.read) {
      return res.status(400).json({
        message: "Ce contact est déjà marqué comme lu.",
      });
    }

    contact.read = true;
    await contact.save();

    res.json(contact);
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur serveur"));
  }
};


const transporter = nodemailer.createTransport({
  service: "gmail", // email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});



export const sendMail = async (req, res, next) => {
  const { fname, address, motif, number, email, message } = req.body;

  try {
    // Prepare the email content
    const mailOptions = {
      from: email, // The user's email
      to: process.env.EMAIL_USER, // Your email address to receive the message
      subject: `Contact Request from ${fname} : ${motif}`,
      html: `
        <h3><strong>Name:</strong> ${fname}</h3>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Number:</strong> ${number}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Votre message a été envoyé avec succès et sera traité bientôt.",
    });
  } catch (error) {
    next(errorHandler(error.status || 500, error.message || "Erreur d'envoi de l'email."));
  }
};
