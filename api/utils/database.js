import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = process.env.DATABASE_URI;

    // Vérifier si l'URI de la base de données est fournie
    if (!dbURI) {
      throw new Error("L'URI de la base de données est manquante dans le fichier .env.");
    }

    // Se connecter à MongoDB
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    // Si l'URI est manquante ou incorrecte, terminer le processus avec un code d'erreur
    process.exit(1);
  }
};

export default connectDB;
