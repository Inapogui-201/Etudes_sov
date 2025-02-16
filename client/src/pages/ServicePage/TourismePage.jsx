import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom'

const TourismePage = () => {
  return (
    <main>
    {/* Hero Section */}
    <section className="relative py-24 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Explorez les Merveilles du Monde
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Découvrez les destinations les plus incroyables du monde avec notre accompagnement personnalisé.
          </p>
        </div>
      </div>
    </section>
      {/* Description Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">Description</h2>
            <p className="mt-4 text-lg text-gray-600">
              Que vous soyez à la recherche d'une aventure exotique, d'une escapade relaxante ou d'un voyage culturel enrichissant, nous vous offrons un service complet pour organiser votre séjour. Nous prenons en charge tous les aspects de votre voyage : recherche de destinations, réservation de vols et d'hôtels, conseils personnalisés, et bien plus encore. Avec nous, vous explorez le monde en toute sérénité.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-100">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">Comment ça marche ?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Nous avons conçu un processus simple et fluide pour vous permettre de partir en toute tranquillité. Voici comment nous fonctionnons :
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-800">1. Consultation Initiale</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous commençons par une consultation gratuite pour comprendre vos attentes, préférences et budget. Cette étape nous permet de personnaliser votre expérience de voyage.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-800">2. Planification Personnalisée</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Après avoir recueilli vos informations, nous vous proposons des destinations et itinéraires adaptés à vos souhaits. Nous recherchons les meilleures options pour vous.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-800">3. Réservation et Confirmation</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Une fois que vous êtes satisfait de votre plan, nous nous occupons de toutes les réservations nécessaires : vol, hôtel, excursions, etc.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-800">4. Voyage en Toute Sérénité</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Une fois sur place, notre équipe est disponible pour résoudre toute question ou problème. Vous pouvez ainsi profiter de votre aventure sans soucis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold">Prêt à explorer le monde ?</h2>
          <p className="mt-4 text-lg">
            Contactez-nous dès aujourd'hui pour planifier votre prochaine aventure, et laissez-nous nous occuper du reste !
          </p>
          <Link to={"/nos-destinations"}> 
          <Button className="mt-8 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-200">
           Voir les Destinations
          </Button>
          </Link>
         
        </div>
      </section>
  </main>
  )
}

export default TourismePage