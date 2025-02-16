import React, { useState } from "react"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NavBar from "../../content/NavBar";
import CardSection from "../../content/CardSection";
import ChartSection from "../../content/ChartSection";
import { Toaster, toast } from "sonner";
import UploadWidget from "@/lib/Upload";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const HomePages = () => {
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    continent: "",
    image: "",
    shortDescription: "",
    fullDescription: "",
  });

  // Gérer la modification des champs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer l'upload de l'image
  const handleImageUpload = (imageUrl) => {
    if (!imageUrl) {
      toast.error("Aucun fichier sélectionné.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  // Gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, continent, image, shortDescription, fullDescription } = formData;

    // Validation des champs obligatoires
    if (!title || !shortDescription || !fullDescription || !image) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/destinations/new", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          continent,
          image,
          shortDescription,
          fullDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }

      toast.success("Destination ajoutée avec succès");
      // Réinitialiser le formulaire après un envoi réussi
      setFormData({
        title: "",
        continent: "",
        image: "",
        shortDescription: "",
        fullDescription: "",
      });
    } catch (error) {
      toast.error(error.message || "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
};


  return (
    <>
      <Toaster position="top-right" />
      <div className="grid gap-6">
        {/* Section des cartes du haut */}
        <CardSection />
      </div>
      {/* Section graphique et formulaire */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-5">
        {/* Chart Area */}
        {/* <ChartSection /> */}
        {/* Formulaire d'ajout de destination */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ajouter une destination</h3>
            <div className="space-y-4">
              <Input
                type="text"
                name="title"
                placeholder="Pays"
                value={formData.title}
                onChange={handleChange}
              />
                <Input
                type="text"
                name="continent"
                placeholder="Continent"
                value={formData.continent}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="shortDescription"
                placeholder="Slogan"
                value={formData.shortDescription}
                onChange={handleChange}
              />
              <Textarea
                type="text"
                name="fullDescription"
                placeholder="Description"
                value={formData.fullDescription}
                onChange={handleChange}
              />
              <div className="mt-5">
                {/* <Input
                  name="image"
                  type="file"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                /> */}
                <UploadWidget
                  uwConfig={{
                    multiple: false,
                    cloudName: "do2qwucmp",
                    uploadPreset: "estate",
                    folder: "sovEtudes",
                    allowedFormats: ["png", "jpeg", "jpg"],
                  }}
                  setImage={handleImageUpload}
                />
              </div>
              <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ajout en cours...
                  </>
                ) : (
                  "Ajouter"
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomePages;
