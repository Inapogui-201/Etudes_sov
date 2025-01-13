import React from "react";
import { Link } from "react-router-dom";
import { 
  Plane, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin,
  ArrowUp,
  ExternalLink
} from "lucide-react";
import LOGO from "/images/logo1.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 pt-16 border-t">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Top section with contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold">Téléphone</h4>
              <p className="text-gray-600">+212 666-666666</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">contact@sovetude.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold">Adresse</h4>
              <p className="text-gray-600">Maroc, Casablanca</p>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12">
          {/* About section */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img src={LOGO} alt="Sov-Etude-2.0" className="h-16 w-auto" />
            </Link>
            <p className="text-gray-600">
              Votre partenaire de confiance pour des voyages inoubliables.
              Nous vous accompagnons dans tous vos projets d'études à l'étranger.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Voyages organisés
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Réservation d'hôtels
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Transport
                </Link>
              </li>
            </ul>
          </div>

          {/* Company section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Entreprise</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/nous-contacter" className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600">Restez informé de nos dernières actualités</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors duration-300">
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/admin/auth/connexion/" target="_blank" className="hover:text-primary transition-colors duration-300">
                SOV Etude
              </Link>
              . Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                to="https://www.mrcode.ma" 
                className="text-sm text-gray-600 hover:text-primary transition-colors duration-300 flex items-center gap-1" 
                target="_blank"
              >
                Mr<span>.Code</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button 
                onClick={scrollToTop}
                className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;