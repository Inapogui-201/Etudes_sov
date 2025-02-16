import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Upload, X, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UploadWidget from '@/lib/Upload';
import { Toaster, toast } from 'sonner';


const DestinationPages = () => {
  const [destinations, setDestinations] = useState([]);
  const [editingDestination, setEditingDestination] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const initialFormState = {
    title: '',
    continent: '',
    shortDescription: '',
    fullDescription: '',
    image: null,
    imageUrl: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Charger les destinations au montage du composant
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations');
        const data = await response.json();
        setDestinations(data.destinations);
      } catch (error) {
        toast.error(error.message || "Erreur lors du chargement des destinations");
      }
    };
    fetchDestinations();
  }, []);

  // Fonction pour gérer le changement d'image
  const handleImageUpload = (imageUrl) => {
    if (!imageUrl) {
      toast.error("Aucun fichier sélectionné.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
    setPreviewImage(imageUrl); 
  };

  // Fonction de soumission du formulaire 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, continent, shortDescription, fullDescription, image } = formData;

    if (editingDestination) {
      // Mise à jour d'une destination existante
      try {
        const response = await fetch(`/api/destinations/update/${editingDestination.title}`, {
          method: 'PATCH',
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, continent, shortDescription, fullDescription, image })
        });
        const updatedDest = await response.json();
        setDestinations(destinations.map(dest =>
          dest.title === editingDestination.title ? updatedDest : dest
        ));
        setEditingDestination(null);
        toast.success("Destination modifiée avec succès");
        window.location.reload();
      } catch (error) {
        toast.error(error.message || "Erreur lors de la mise à jour");
      }
    } else {
      // Ajouter une nouvelle destination
      try {
        const response = await fetch('/api/destinations/new', {
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
        const newDest = await response.json();
        toast.success("Destination ajoutée avec succès");
        window.location.reload();  // Recharger la page après ajout
        setDestinations([...destinations, newDest]);
      } catch (error) {
        toast.error(error.message || "Erreur lors de l'envoi");
      }
    }

    setFormData(initialFormState);  
    setPreviewImage(null);  
  };

  // Fonction pour annuler l'édition d'une destination
  const cancelEdit = () => {
    setEditingDestination(null);
    setFormData(initialFormState);
    setPreviewImage(null);
  };

  // Fonction pour éditer une destination
  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setFormData({
      title: destination.title,
      continent: destination.continent,
      shortDescription: destination.shortDescription,
      fullDescription: destination.fullDescription,
      image: destination.image,
      imageUrl: destination.imageUrl
    });
    setPreviewImage(destination.imageUrl);
  };

  // Fonction pour supprimer une destination
  const handleDelete = async (destinationTitle) => {
    try {
      const response = await fetch(`/api/destinations/delete/${destinationTitle}`, { 
        method: 'DELETE',
        credentials: "include",
      });
      if (response.ok) {
        setDestinations(destinations.filter(dest => dest.title !== destinationTitle));
        toast.success("Destination supprimée avec succès");
      }
    } catch (error) {
      toast.error(error.message || "Erreur lors de la suppression");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 p-4 md:p-6 min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {/* Section des destinations */}
      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.title} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-xl">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={destination.image || '/api/placeholder/800/500'}
                  alt={destination.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/800/500";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">{destination.title}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(destination)} className="h-8 w-8 hover:bg-gray-100">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600 border-red-200">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir supprimer cette destination ? Cette action est irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => handleDelete(destination.title)}>
                              Confirmer la suppression
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <p className="text-gray-600">{destination.shortDescription}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>{destination.fullDescription}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Section du formulaire */}
      <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
        <Card className="sticky top-6 border-0 shadow-lg rounded-xl">
          <CardHeader className="space-y-2 pb-4 border-b">
            <CardTitle className="text-2xl font-bold">
              {editingDestination ? 'Modifier la destination' : 'Ajouter une destination'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {editingDestination ? 'Modifiez les détails de la destination' : 'Ajoutez une nouvelle destination'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Titre</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Titre de la destination"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="continent" className="text-sm font-medium">Continent</Label>
                <Input
                  id="continent"
                  name="continent"
                  placeholder="Continent"
                  value={formData.continent}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription" className="text-sm font-medium">Slogan</Label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Slogan"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription" className="text-sm font-medium">Description complète</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  className="w-full min-h-[100px] resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium">Image</Label>
                <div className="mt-2">
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
                  {previewImage && (
                    <div className="mt-4 relative rounded-xl overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingDestination ? 'Mettre à jour' : 'Ajouter la destination'}
                </Button>
                {editingDestination && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
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

export default DestinationPages;
