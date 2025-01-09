import jwt from "jsonwebtoken";
import errorHandler from "../utils/Error.js";

// Middleware pour vérifier l'authentification de l'administrateur
export const VerifyAdmin = (req, res, next) => {
  // Extraire le token des cookies ou des en-têtes Authorization
  const token = req.cookies.TknA83XyLpW9KzT || req.headers.authorization?.split(' ')[1];

  // Si le token est absent, retourner une erreur
  if (!token) {
    return next(
      errorHandler(401, "Vous n'êtes pas authentifié. Veuillez vous connecter.")
    );
  }

  // Vérification du token avec la clé secrète
  jwt.verify(token, process.env.ADMIN_SECRET_TOKEN_KEY, (err, decoded) => {
    if (err) {
      // Différencier les erreurs d'expiration et autres erreurs de validation du token
      if (err.name === "TokenExpiredError") {
        return next(
          errorHandler(403, "Votre session a expiré. Veuillez vous reconnecter.")
        );
      }

      // Autres erreurs liées au token (token invalide, mal formé, etc.)
      return next(errorHandler(403, "Le token n'est pas valide."));
    }

    // Si le token est valide, on ajoute l'ID de l'administrateur à la requête
    req.adminId = decoded.id;

    // Passer au prochain middleware (ou à la fonction de traitement de la route)
    next();
  });
};
