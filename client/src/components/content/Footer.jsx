import { Plane } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import LOGO from "/images/logo1.png";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src={LOGO} alt="Sov-Etude-2.0" className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-gray-500">
              Votre partenaire de confiance pour des voyages inoubliables.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="#">Voyages organisés</Link>
              </li>
              <li>
                <Link href="#">Réservation d'hôtels</Link>
              </li>
              <li>
                <Link href="#">Transport</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="#">À propos</Link>
              </li>
              <li>
                <Link to={"/nous-contacter"}>Contact</Link>
              </li>
              <li>
                <Link to={"/actualites"}>Blog</Link>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="#">Conditions générales</Link>
              </li>
              <li>
                <Link href="#">Politique de confidentialité</Link>
              </li>
              <li>
                <Link href="#">Mentions légales</Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} <Link to={"/admin/auth/connexion/"} target="_blank">SOV Etude</Link> . Tous droits réservés. || <Link to={"https://www.mrcode.ma"} className="hover:underline" target="_blank">Mr<span className="hover:text-blue-700 ">.Code</span></Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
