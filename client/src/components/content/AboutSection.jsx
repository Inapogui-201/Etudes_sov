import React from 'react'

const AboutSection = () => {
  return (
    <section className="py-14 mb-[-30px] bg-gray-50">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Qui Sommes Nous ?</h2>
          <p className="text-gray-500 md:text-lg">
          SOV ÉTUDES est votre partenaire de confiance pour réaliser vos rêves d'études à l'étranger. Depuis notre création, nous nous engageons à offrir un accompagnement personnalisé et des solutions adaptées à chaque étudiant.
          </p>
          <p className="text-gray-500 md:text-lg">
            Nous collaborons avec les meilleurs partenaires locaux pour vous garantir des prestations de qualité et une
            immersion authentique dans chaque destination.
          </p>
        </div>
        <div className="relative aspect-video lg:aspect-square">
          <img
            src="https://img.freepik.com/photos-gratuite/groupe-personnes-preparant-plan-affaires-dans-bureau_1303-15861.jpg?t=st=1735815445~exp=1735819045~hmac=f998545145eacfb51dc14fd3d7bc0181dd1e59a2ca5fc315a1cf03d41619b0f9&w=740"
            alt="Notre équipe"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  </section>
  )
}

export default AboutSection