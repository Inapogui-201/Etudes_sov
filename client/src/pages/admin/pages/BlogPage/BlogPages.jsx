import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BlogPages = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  
  const initialFormState = {
    title: '',
    description: '',
    category: '',
    readTime: '',
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
    if (editingBlog) {
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id ? { ...formData, id: blog.id } : blog
      ));
      setEditingBlog(null);
    } else {
      const newBlog = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString()
      };
      setBlogs([...blogs, newBlog]);
    }
    setFormData(initialFormState);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData(blog);
    setPreviewImage(blog.imageUrl);
  };

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    setFormData(initialFormState);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Blog Cards Section - Left Side */}
      <div className="w-full lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {blog.imageUrl && (
                <div className="relative">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex justify-between items-center text-sm text-white">
                      <span>{new Date(blog.date).toLocaleString()}</span>
                      <span>{blog.readTime} min</span>
                    </div>
                  </div>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{blog.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{blog.description}</p>

                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleEdit(blog)}
                    className="hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        className="hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Confirmer la suppression</DialogTitle>
                        <DialogDescription className="text-gray-600">
                          Êtes-vous sûr de vouloir supprimer ce blog ? Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-3">
                        <Button variant="outline" onClick={() => handleDelete(blog.id)}>
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

      {/* Form Section - Right Side */}
      <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
        <Card className="sticky top-6">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              {editingBlog ? 'Modifier le blog' : 'Ajouter un nouveau blog'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {editingBlog ? 'Modifiez les détails du blog' : 'Remplissez les détails pour créer un nouveau post'}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">Catégorie</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => 
                    setFormData(prev => ({...prev, category: value}))
                  }
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="destination">Destination</SelectItem>
                    <SelectItem value="gastronomie">Gastronomie</SelectItem>
                    <SelectItem value="aventure">Aventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime" className="text-sm font-medium">Temps de lecture (minutes)</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  type="number"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
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
                  {editingBlog ? 'Mettre à jour' : 'Ajouter le blog'}
                </Button>
                {editingBlog && (
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

export default BlogPages;