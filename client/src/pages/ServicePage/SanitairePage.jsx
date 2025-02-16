import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const SanitairePage = () => {
  return (
    <main>
    {/* Hero Section */}
    <section className="relative py-24 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Évacuation Sanitaire d'Urgence
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Votre santé est notre priorité, où que vous soyez dans le monde.
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
            En cas d'urgence médicale, notre service d'évacuation sanitaire d'urgence est là pour vous assurer une prise en charge rapide et efficace. Nous vous accompagnons tout au long du processus, de la prise en charge initiale jusqu'à votre transport vers un établissement de santé adapté. Notre équipe dédiée met en œuvre des solutions adaptées à chaque situation, afin que vous puissiez recevoir les soins nécessaires dans les meilleurs délais.
          </p>
        </div>
      </div>
    </section>

    {/* Comment ça marche Section */}
    <section className="py-24 bg-gray-100">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Comment ça marche ?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Nous avons mis en place un processus simple et rapide pour garantir une prise en charge immédiate. Voici comment cela fonctionne :
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">1. Prise en Charge Initiale</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Dès que vous nous contactez, nous évaluons la situation et organisons une prise en charge immédiate par un professionnel de santé. L'urgence est notre priorité.
              </p>
              <img src="https://sovetudes.vercel.app/sanitaires/es.jpg" alt="Prise en charge initiale" className="w-full h-auto mt-4 rounded-lg shadow-lg" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">2. Transport Médicalisé</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Une fois la situation évaluée, nous organisons un transport médicalisé, que ce soit par ambulance, hélicoptère ou avion médical, selon l'urgence de la situation.
              </p>
              <img src="https://sovetudes.vercel.app/sanitaires/besoin.jpg" alt="Transport médicalisé" className="w-full h-auto mt-4 rounded-lg shadow-lg" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">3. Arrivée à l'Établissement Médical</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                À votre arrivée à l'hôpital ou à la clinique de destination, nous nous assurons que vous recevez immédiatement les soins nécessaires, et nous restons en contact avec l'équipe médicale pour assurer votre suivi.
              </p>
              <img src="https://sovetudes.vercel.app/sanitaires/avion.jpg" alt="Arrivée à l'hôpital" className="w-full h-auto mt-4 rounded-lg shadow-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="py-16 bg-primary text-white">
      <div className="container px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold">Besoin d'une Evacuation Sanitaire d'Urgence ?</h2>
        <p className="mt-4 text-lg">
          Si vous êtes dans une situation d'urgence médicale, contactez-nous immédiatement. Nous sommes là pour vous assurer une prise en charge rapide et sécurisée.
        </p>
        <Button className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          <Link to={"/nous-contacter"}>Nous contacter</Link>
          
        </Button>
      </div>
    </section>
  </main>
  )
}

export default SanitairePage