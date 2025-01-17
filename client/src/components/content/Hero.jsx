import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 bg-[url("https://images.pexels.com/photos/164589/pexels-photo-164589.jpeg?auto=compress&cs=tinysrgb&w=600")] bg-cover bg-center bg-no-repeat brightness-50`}
      />
      <div className="relative container px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Votre Avenir Commence Ici
          </h1>
          <p className="text-xl text-gray-200">
            Découvrez des destinations extraordinaires et créez des souvenirs
            inoubliables avec notre expertise en voyages personnalisés.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg"><Link to={"/prendre-rendez-vous"}>Commencez l'aventure</Link></Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:text-black">
            <Link to={"/a-propos"}>En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
