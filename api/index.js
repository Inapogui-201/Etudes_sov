import express from "express";
import dotenv from "dotenv"
import path from "path";
import cors from "cors"
import connectDB from "./utils/database.js";
import AuthRoute from "./routes/AuthRoute.js"
import DestinationRoute from "./routes/DestinationRoute.js"
import TestimonyRoute from "./routes/testimonyRoute.js"
import EventRoute from "./routes/EventRoute.js"

import AppointmentRoute from "./routes/RendezVousRoute.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const __dirname = path.resolve()
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.options("*", cors());

connectDB()

//Routes
app.use("/api/admin", AuthRoute)
app.use("/api/destinations", DestinationRoute)
app.use("/api/testimony", TestimonyRoute)
app.use("/api/events", EventRoute)
app.use("/api/appointment", AppointmentRoute)


// Fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, "/client/dist")));

// Redirection pour les routes non gérées
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


// Middleware de gestion des erreurs
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Erreur de serveur";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
