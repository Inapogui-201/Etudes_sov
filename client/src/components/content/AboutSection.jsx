import React from 'react';
import { ArrowRight, Users, GraduationCap, Globe } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Accompagnement Personnalisé",
      description: "Une approche sur mesure pour chaque étudiant"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Excellence Académique",
      description: "Partenariats avec des institutions reconnues"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Réseau International",
      description: "Des partenaires locaux dans chaque destination"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 animate-fade-in">
                Qui Sommes Nous ?
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 md:text-lg">
                  SOV ÉTUDES est votre partenaire de confiance pour réaliser vos rêves d'études à l'étranger. 
                  Depuis notre création, nous nous engageons à offrir un accompagnement personnalisé et des 
                  solutions adaptées à chaque étudiant.
                </p>
                <p className="text-gray-600 md:text-lg">
                  Nous collaborons avec les meilleurs partenaires locaux pour vous garantir des prestations 
                  de qualité et une immersion authentique dans chaque destination.
                </p>
              </div>
              <a href="/a-propos"><button className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary transition-colors duration-300">
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </button>
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3 pt-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <div className="aspect-video lg:aspect-square relative">
              <img
            src="https://img.freepik.com/photos-gratuite/groupe-personnes-preparant-plan-affaires-dans-bureau_1303-15861.jpg?t=st=1735815445~exp=1735819045~hmac=f998545145eacfb51dc14fd3d7bc0181dd1e59a2ca5fc315a1cf03d41619b0f9&w=740"
            alt="Notre équipe"
                className="object-cover w-full h-full rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;