import Admin from "../model/AdminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorHandler from "../utils/Error.js";

// Inscription d'un administrateur
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier que tous les champs sont remplis
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Veuillez compléter tous les champs",
      });
    }

    // Vérifier si un administrateur avec le même email existe déjà
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(403).json({
        success: false,
        message: "Un administrateur existe déjà avec cet email.",
      });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel administrateur
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    // Sauvegarder l'administrateur dans la base de données
    await newAdmin.save();

    // Répondre avec succès
    res.status(201).json({
      success: true,
      message: "Compte administrateur créé avec succès !",
      admin: { ...newAdmin._doc, password: undefined }, // Supprime le mot de passe de la réponse
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur:", error);
    res.status(500).json({
      success: false,
      message:
        "Une erreur est survenue lors de la création du compte administrateur.",
    });
  }
};

// Connexion d'un administrateur
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Vérifier que l'email et le mot de passe sont fournis
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Veuillez fournir un email et un mot de passe",
      });
    }

    // Rechercher l'admin par email
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou mot de passe incorrect !" });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, validAdmin.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou mot de passe incorrect !" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: validAdmin._id },
      process.env.ADMIN_SECRET_TOKEN_KEY,
      { expiresIn: "1d" }
    );

    // Configurer le cookie
    res
      .cookie("TknA83XyLpW9KzT", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 86400000, // 1 jour
      })
      .status(200)
      .json({
        success: true,
        message: "Connexion réussie",
        admin: { ...validAdmin._doc, password: undefined },
      });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

// Déconnexion de l'administrateur
export const signOut = async (req, res, next) => {
  try {
    const token = req.cookies.TknA83XyLpW9KzT;

    // Vérifie si le token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Vous n'êtes pas connecté.",
      });
    }

    // Vérifie et décode le token
    const decodedToken = jwt.verify(token, process.env.ADMIN_SECRET_TOKEN_KEY);
    const adminId = decodedToken.id;

    // Vérifie si Admin existe dans la base de données
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin non trouvé.",
      });
    }

    // Effacer le cookie de connexion
    res
      .clearCookie("TknA83XyLpW9KzT", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
      })
      .status(200)
      .json({
        success: true,
        message: "Déconnexion réussie.",
      });
  } catch (error) {
    // Gestion d'erreur améliorée
    res.status(500).json({
      success: false,
      message: "Une erreur s'est produite lors de la déconnexion.",
    });
  }
};

// Mise à jour du profil de l'administrateur
export const updateProfile = async (req, res, next) => {
  const { username, email, tel, password, oldPassword } = req.body;

  try {
    // Vérifier que le token est présent dans les cookies
    const token = req.cookies.TknA83XyLpW9KzT;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Vous devez être connecté pour mettre à jour votre profil.",
      });
    }

    // Vérifier et décoder le token JWT
    const decodedToken = jwt.verify(token, process.env.ADMIN_SECRET_TOKEN_KEY);
    const adminId = decodedToken.id;

    // Rechercher l'admin dans la base de données
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin non trouvé.",
      });
    }

    // Vérifier si l'ancien mot de passe est fourni et valide
    if (oldPassword) {
      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        admin.password
      );
      if (!isOldPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "L'ancien mot de passe est incorrect.",
        });
      }
    }

    // Mettre à jour les champs si nécessaire
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (tel) admin.tel = tel;

    // Si un nouveau mot de passe est fourni, le hacher
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    // Sauvegarder les modifications
    await admin.save();

    // Répondre avec succès
    res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès.",
      admin: { ...admin._doc, password: undefined },
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
