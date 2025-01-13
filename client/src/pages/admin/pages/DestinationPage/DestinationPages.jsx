import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Upload, X, Clock, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const DestinationPages = () => {
  const [destinations, setDestinations] = useState([]);
  const [editingDestination, setEditingDestination] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  
  const initialFormState = {
    country: '',
    title: '',
    price: '',
    duration: '',
    rating: '',
    image: null,
    imageUrl: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file)
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDestination) {
      setDestinations(destinations.map(dest => 
        dest.id === editingDestination.id ? { ...formData, id: dest.id } : dest
      ));
      setEditingDestination(null);
    } else {
      const newDestination = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      };
      setDestinations([...destinations, newDestination]);
    }
    setFormData(initialFormState);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setFormData(destination);
    setPreviewImage(destination.imageUrl);
  };

  const handleDelete = (destinationId) => {
    setDestinations(destinations.filter(dest => dest.id !== destinationId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const cancelEdit = () => {
    setEditingDestination(null);
    setFormData(initialFormState);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Destinations Section - Left Side */}
      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-xl">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={destination.imageUrl || '/api/placeholder/800/500'}
                  alt={destination.country}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/800/500";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{destination.rating}</span>
                  <span className="text-gray-500 text-sm">/ 5</span>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">{destination.country}</h2>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEdit(destination)}
                        className="h-8 w-8 hover:bg-gray-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-red-50 hover:text-red-600 border-red-200"
                          >
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
                            <Button variant="outline" onClick={() => handleDelete(destination.id)}>
                              Confirmer la suppression
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <p className="text-gray-600">{destination.title}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    à partir de <span className="text-primary">{destination.price}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Section - Right Side */}
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
                <Label htmlFor="country" className="text-sm font-medium">Pays</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full min-h-[100px] resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">Prix (€)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium">Durée</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="text-sm font-medium">Note (sur 5)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium">Image</Label>
                <div className="mt-2">
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="image"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choisir une image
                    </Button>
                  </div>
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
                          setFormData(prev => ({...prev, image: null, imageUrl: ''}));
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
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