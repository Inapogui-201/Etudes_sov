import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsPage = () => {
  // Données des témoignages
  const testimonials = [
    {
      id: 1,
      name: "Marie Laurent",
      role: "Voyageuse régulière",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "Un service exceptionnel ! L'équipe a su répondre à toutes mes attentes et même au-delà. Je recommande vivement leur expertise pour l'organisation de voyages.",
      location: "Paris, France"
    },
    {
      id: 2,
      name: "Thomas Martin",
      role: "Entrepreneur",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "Des prestations de qualité et un suivi personnalisé tout au long du séjour. Une agence qui sait prendre soin de ses clients.",
      location: "Lyon, France"
    },
    {
      id: 3,
      name: "Sophie Dubois",
      role: "Famille de 4",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "Notre voyage en famille a été parfaitement organisé. Chaque détail a été pensé pour le confort des enfants. Une expérience mémorable !",
      location: "Bordeaux, France"
    },
    {
      id: 4,
      name: "Pierre Dupont",
      role: "Couple en lune de miel",
      image: "/api/placeholder/80/80",
      rating: 5,
      content: "Notre lune de miel était absolument parfaite. Des destinations de rêve et un service irréprochable. Merci pour ces moments magiques !",
      location: "Nice, France"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Section Hero avec image de fond */}
      <section className="relative h-[60vh] flex items-end justify-center pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3769146/pexels-photo-3769146.jpeg?auto=compress&cs=tinysrgb&w=600')`,
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative text-center text-white space-y-4 px-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Témoignages de nos Clients
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez les expériences authentiques de nos voyageurs
          </p>
        </div>
      </section>

      {/* Section Vidéo */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-xl">
              <CardContent className="p-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/9QBh0OZrCc8"
                    title="Témoignage client"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Témoignages écrits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex space-x-4 items-start">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                        <Quote className="w-8 h-8 text-primary/20" />
                      </div>
                      <div className="flex items-center mt-2 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
                      <p className="mt-4 text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;