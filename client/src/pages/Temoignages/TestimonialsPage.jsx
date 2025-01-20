import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchTestimony = async () => {
      try {
        const response = await fetch(`/api/testimony/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch testimony");
        }
        const data = await response.json();

        const testimonyData = data.testimonies || [];
        setTestimonials(testimonyData);
        //console.log(testimonyData);
      } catch (error) {
        setError(error.message || "Error fetching testimony");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimony();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section Hero avec image de fond */}
      <section className="relative h-[60vh] flex items-end justify-center pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3769146/pexels-photo-3769146.jpeg?auto=compress&cs=tinysrgb&w=600')`,
            backgroundPosition: "center",
            filter: "brightness(0.7)",
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
          {loading ? (
            <div className="text-center text-xl">
              Chargement des témoignages...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-xl">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Vérification si au moins un témoignage valide existe */}
            {testimonials.filter(testimonial => testimonial?.action).length === 0 ? (
              <p className="text-center">Pas de témoignage</p>
            ) : (
              testimonials.map((testimonial) => (
                // Affichage uniquement si action est true
                testimonial?.action && (
                  <div key={testimonial._id}>
                    {testimonial.category === "text" ? (
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex space-x-4 items-start">
                            <img
                              src={testimonial.medias}
                              alt="Testimonial"
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{testimonial.author}</h3>
                                </div>
                                <Quote className="w-8 h-8 text-primary/20" />
                              </div>
                              <p className="text-gray-600 leading-relaxed">{testimonial.message}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <video controls width="250">
                        <source src={testimonial.medias} type="video/webm" />
                      </video>
                    )}
                  </div>
                )
              ))
            )}
          </div>
          
          )}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
