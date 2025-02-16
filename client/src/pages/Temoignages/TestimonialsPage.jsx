import React, { useEffect, useState } from "react"
import { Star, Quote, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchTestimony = async () => {
      try {
        const response = await fetch(`/api/testimony/all`)
        if (!response.ok) {
          throw new Error("Failed to fetch testimony")
        }
        const data = await response.json()

        const testimonyData = data.testimonies || []
        setTestimonials(testimonyData)
      } catch (error) {
        setError(error.message || "Error fetching testimony")
      } finally {
        setLoading(false)
      }
    }

    fetchTestimony()
  }, [])

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
          <h1 className="text-5xl font-bold tracking-tight">Témoignages de nos Clients</h1>
          <p className="text-xl max-w-2xl mx-auto">Découvrez les expériences authentiques de nos voyageurs</p>
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

      {/* Section Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-xl">Chargement des témoignages...</div>
          ) : error ? (
            <div className="text-center text-red-500 text-xl">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonials.filter((testimonial) => testimonial?.action).length === 0 ? (
                <p className="text-center">Pas de témoignage</p>
              ) : (
                testimonials.map(
                  (testimonial) =>
                    testimonial?.action && (
                      <Card
                        key={testimonial._id}
                        className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            {/* En-tête avec photo et nom */}
                            <div className="flex items-center space-x-4">
                              <img
                                src={
                                  testimonial.category === "text"
                                    ? testimonial.medias
                                    : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                }
                                alt={`Photo de ${testimonial.author}`}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-semibold">{testimonial.author}</h3>
                                <p className="text-sm text-gray-500">
                                  {testimonial.category === "text" ? "Témoignage écrit" : "Témoignage vidéo"}
                                </p>
                              </div>
                            </div>

                            {/* Contenu du témoignage */}
                            {testimonial.category === "text" ? (
                              <div className="relative">
                                <Quote className="absolute top-0 left-0 w-8 h-8 text-primary/20 -translate-x-2 -translate-y-2" />
                                <p className="text-gray-600 leading-relaxed pl-6">{testimonial.message}</p>
                              </div>
                            ) : (
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                <video
                                  controls
                                  className="absolute inset-0 w-full h-full object-cover"
                                  poster="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                >
                                  <source src={testimonial.medias} type="video/webm" />
                                  Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ),
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default TestimonialsPage

