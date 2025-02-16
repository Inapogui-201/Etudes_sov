import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import { Select } from "@/components/ui/select";
import UploadWidget from "@/lib/Upload";

// Fonction pour récupérer les témoignages
const fetchTestimonies = async () => {
  const response = await fetch("/api/testimony");
  const data = await response.json();
  return data.testimonies;
};

const TestimonyPage = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [editingTestimony, setEditingTestimony] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
    author: "",
    category: "text",
    medias: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchTestimonies().then((data) => {
      setTestimonies(data);
    });
  }, []);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { message, author, category, medias } = formData;

    // Ajout ou mise à jour d'un témoignage
    if (editingTestimony) {
      // Logique de mise à jour
      await fetch(`/api/testimony/${editingTestimony._id}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, author, category, medias }),
      });
      toast.success("Témoignage mis à jour avec succès");
    } else {
      // Ajout d'un nouveau témoignage
      await fetch("/api/testimony/new", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, author, category, medias }),
      });
      toast.success("Témoignage ajouté avec succès");
      window.location.reload();
    }

    setFormData({ message: "", author: "", category: "text", medias: "" });
  };

  // Gérer l'édition d'un témoignage
  const handleEdit = (testimony) => {
    setEditingTestimony(testimony);
    setFormData(testimony);
    setPreviewImage(testimony.medias);
  };

  // Gérer la suppression d'un témoignage
  const handleDelete = async (id) => {
    await fetch(`/api/testimony/${id}/delete`, {
      credentials: "include",
      method: "DELETE",
    });
    setTestimonies(testimonies.filter((testimony) => testimony._id !== id));
    toast.success("Témoignage supprimé avec succès");
    window.location.reload();
  };

  // Gérer l'action pour marquer un témoignage comme public/privé
  const handleMark = async (id) => {
    const response = await fetch(`/api/testimony/${id}/mark`, {
      method: "PATCH",
      credentials: "include",
    });
    const data = await response.json();
    setTestimonies(
      testimonies.map((testimony) =>
        testimony._id === id
          ? { ...testimony, action: data.testimony.action }
          : testimony
      )
    );
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 p-4 md:p-6 min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Liste des témoignages */}
      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonies.map((testimony) => (
            <Card
              key={testimony._id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {testimony.category === "video" ? (
                <div className="relative">
                  <video controls className="h-48 w-full object-cover">
                    <source src={testimony.medias} type="video/mp4" />
                    Votre navigateur ne prend pas en charge la balise vidéo.
                  </video>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex justify-between items-center text-sm text-white">
                      <span>{testimony.author}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative p-2">
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {testimony.message}
                  </p>
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {testimony.author}
                </h3>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(testimony)}
                    className="hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(testimony._id)}
                    className="hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMark(testimony._id)}
                  >
                    {testimony.action ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Formulaire d'ajout ou de modification de témoignage */}
      <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
        <Card className="sticky top-6">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              {editingTestimony
                ? "Modifier le Témoignage"
                : "Ajouter un Témoignage"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {editingTestimony
                ? "Modifiez les détails du témoignage"
                : "Ajoutez un nouveau témoignage"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {formData.category === "text" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-sm font-medium">
                      Auteur
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-h-[100px]"
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Catégorie
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="text">Texte</option>
                  <option value="video">Vidéo</option>
                </select>
              </div>

              {formData.category === "video" && (
                <div className="space-y-2">
                  <Label htmlFor="medias" className="text-sm font-medium">
                    Vidéo
                  </Label>
                  <UploadWidget
                    uwConfig={{
                      multiple: false,
                      cloudName: "do2qwucmp",
                      uploadPreset: "estate",
                      folder: "sovEtudes",
                      allowedFormats: ["mp4", "ogg"],
                    }}
                    setImage={(videoUrl) =>
                      setFormData({ ...formData, medias: videoUrl })
                    }
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingTestimony ? "Mettre à jour" : "Ajouter le témoignage"}
                </Button>
                {editingTestimony && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingTestimony(null)}
                  >
                    Annuler
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestimonyPage;
