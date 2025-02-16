import { partners } from '@/lib/data'
import React from 'react'

const PartenaireSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter">Nos Partenaires</h2>
          <p className="text-gray-500">Ils nous font confiance</p>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-marquee gap-8 items-center">
            {/* Première série d'images */}
            {partners.map((partner) => (
              <div key={partner.name} className="flex-shrink-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all w-32 h-auto"
                />
              </div>
            ))}
            {/* Deuxième série d'images pour l'effet de boucle infinie */}
            {partners.map((partner) => (
              <div key={`duplicate-${partner.name}`} className="flex-shrink-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all w-32 h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartenaireSection
