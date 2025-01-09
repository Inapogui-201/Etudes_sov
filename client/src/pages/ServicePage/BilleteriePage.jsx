import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plane,
  Search,
  CreditCard,
  Calendar,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { Link } from "react-router-dom";

const BilleteriePage = () => {
  const airlines = [
    {
      name: "Air France",
      logo: "/placeholder.svg?height=60&width=120",
      description: "Compagnie aérienne nationale française",
    },
    {
      name: "KLM",
      logo: "/placeholder.svg?height=60&width=120",
      description: "Royal Dutch Airlines",
    },
    {
      name: "Lufthansa",
      logo: "/placeholder.svg?height=60&width=120",
      description: "Plus grande compagnie aérienne allemande",
    },
    {
      name: "Emirates",
      logo: "/placeholder.svg?height=60&width=120",
      description: "Compagnie aérienne de Dubaï",
    },
  ];

  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Recherchez",
      description: "Entrez vos dates et destination",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Sélectionnez",
      description: "Choisissez le vol qui vous convient",
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Réservez",
      description: "Effectuez le paiement sécurisé",
    },
  ];

  const additionalInfo = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Service 24/7",
      description: "Assistance disponible à tout moment",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Paiement Sécurisé",
      description: "Transactions cryptées et sécurisées",
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Vols Directs",
      description: "Large choix de vols directs",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              Réservez Votre Vol
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Trouvez les meilleures offres de billets d'avion pour vos
              prochains voyages.
            </p>
          </div>
        </div>
      </section>

      {/* Airlines Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Compagnies Partenaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {airlines.map((airline, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={airline.logo}
                    alt={airline.name}
                    width={120}
                    height={60}
                    className="mx-auto"
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{airline.name}</h3>
                  <p className="text-sm text-gray-500">{airline.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <CardTitle className="mb-2">{step.title}</CardTitle>
                  <p className="text-gray-500">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{info.title}</h3>
                  <p className="text-gray-500">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
        <div className="container px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Besoin d'un Billet en Urgence ?
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Notre service d'urgence est disponible 24/7 pour vous aider à
                réserver votre vol rapidement. Que ce soit pour une urgence
                médicale, professionnelle ou personnelle, nous sommes là pour
                vous.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="flex items-center justify-center space-x-3">
                <PhoneCall className="h-6 w-6" />
                <span>Assistance prioritaire</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Clock className="h-6 w-6" />
                <span>Réponse sous 30 minutes</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="h-6 w-6" />
                <span>Départ possible sous 24h</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-primary bg-white hover:bg-white"
                asChild
              >
                <Link to={"/prendre-rendez-vous"}>
                  Réserver en urgence
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:text-white border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to={"/nous-contacter"}>
                  Nous contacter
                  <PhoneCall className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/80">
              *Des conditions spéciales s'appliquent pour les réservations
              d'urgence. Notre équipe vous guidera à travers le processus.
            </p>
          </div>
        </div>
      </section>

  
    </main>
  );
};

export default BilleteriePage;
