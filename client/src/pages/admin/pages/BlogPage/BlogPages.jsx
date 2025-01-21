import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UploadWidget from '@/lib/Upload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, Toaster } from 'sonner';

const EventPages = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const initialFormState = {
    title: '',
    content: '',
    medias: null,
    imageUrl: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fonction pour récupérer les événements au chargement du composant
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        toast.error('Erreur lors du chargement des événements');
      }
    };
    fetchEvents();
  }, []);

  const handleImageUpload = (imageUrl) => {
    if (!imageUrl) {
      toast.error("Aucune image sélectionnée");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      medias: imageUrl
    }));
    setPreviewImage(imageUrl);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, medias, content } = formData;

    if (editingEvent) {
      // Mettre à jour un événement existant
      try {
        const response = await fetch(`/api/events/${editingEvent._id}/update`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, medias, content })
        });
        const updatedEvent = await response.json();
        setEvents(events.map(event => event._id === editingEvent._id ? updatedEvent.event : event));
        toast.success('Événement mis à jour avec succès');
      } catch (error) {
        toast.error('Erreur lors de la mise à jour de l\'événement');
      }
    } else {
      // Ajouter un nouvel événement
      try {
        const response = await fetch('/api/events/new', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, medias, content })
        });
        const newEvent = await response.json();
        setEvents([...events, newEvent.event]);
        toast.success('Événement ajouté avec succès');
      } catch (error) {
        toast.error('Erreur lors de l\'ajout de l\'événement');
      }
    }

    // Réinitialiser le formulaire après l'envoi
    setFormData(initialFormState);
    setPreviewImage(null);
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      content: event.content,
      medias: event.medias,
      imageUrl: event.medias
    });
    setPreviewImage(event.medias);
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setFormData(initialFormState);
    setPreviewImage(null);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}/delete`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setEvents(events.filter(event => event._id !== eventId));
        toast.success('Événement supprimé avec succès');
      } else {
        toast.error('Erreur lors de la suppression de l\'événement');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'événement');
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 p-4 md:p-6 min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Section des événements */}
      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-xl">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={event.medias || '/api/placeholder/800/500'}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/800/500";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                <p className="text-gray-600">{event.content}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(event)}>
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
                          Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => handleDelete(event._id)}>
                          Confirmer la suppression
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
              {editingEvent ? 'Modifier l\'événement' : 'Ajouter un événement'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {editingEvent ? 'Modifiez les détails de l\'événement' : 'Ajoutez un nouvel événement'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Titre</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium">Contenu</Label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={content => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Écrivez le contenu ici..."
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
                    <div className="mt-4 relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, medias: null }));
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
                  {editingEvent ? 'Mettre à jour' : 'Ajouter l\'événement'}
                </Button>
                {editingEvent && (
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

export default EventPages;
