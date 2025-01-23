import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import React, { useState, useEffect } from "react";  // Importation manquante de useState et useEffect
import { Link, useParams } from "react-router-dom";

const SinglePost = () => {
  const { slug } = useParams();  // Extraction correcte de slug
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const event = await response.json();
        setLoading(false);
        setEvents(event);
      } catch (error) {
        console.error(error);
        setLoading(false);  // Mettre à jour l'état de `loading` en cas d'erreur
      }
    };

    if (slug) {
      fetchEvent();  // Appeler la fonction pour récupérer l'événement
    }
  }, [slug]);  // Dépendance sur `slug` pour recharger l'événement si le paramètre change

  if (loading) {
    return (
      <main className="py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
          </div>
        </div>
      </main>
    );
  }

  if (!events) {
    return (
      <main className="py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
            <Button asChild>
              <Link to={"/actualites"}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux actualités
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 to-gray-900/25">
          <img
            src={events.medias}
            alt="Sov Etude" 
            className="object-cover w-full h-full opacity-70"
          />
        </div>
        <div className="relative container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-white relative z-10">
            <Button
              asChild
              variant="outline"
              className="mb-8 bg-white/10 hover:bg-white/20"
            >
              <Link to="/actualites" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour aux actualités
              </Link>
            </Button>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                {events.title}
              </h1>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(events.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-gray max-w-none">
              
              <div
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: events.content }}
              />
            </div>
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{events.author}</p>
                  <p className="text-sm text-gray-500">Auteur</p>
                </div>
                <Button asChild>
                  <Link to={"/actualites"}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux actualités
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SinglePost;
