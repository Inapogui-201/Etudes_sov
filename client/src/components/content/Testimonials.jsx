import React from "react"
import { Card, CardContent } from "@/components/ui/card"

const Testimonials = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
    Présentation
</h2>
<p className="text-gray-500 md:text-xl max-w-2xl mx-auto">
    Découvrez notre agence de voyage, votre partenaire pour des expériences inoubliables.
</p>

                </div>
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
                            <div className="mt-6 text-center">
                                <h3 className="text-lg font-semibold text-primary">
                                    Un Regard Authentique sur Notre Service
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Écoutez directement l'expérience vécue par nos clients
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Testimonials