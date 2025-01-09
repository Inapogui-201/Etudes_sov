import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Toaster, toast } from "sonner"
import PartenaireSection from '@/components/content/PartenaireSection'

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Event has been created')
    setIsSubmitting(false);(e).reset()
  }
  
  return ( 
    <main>
      <Toaster position="top-center"/>
    {/* Hero Section */}
    <section className="bg-gray-50 py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Contactez-nous
          </h1>
          <p className="mt-4 text-gray-500">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </div>
    </section>

    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Envoyez-nous un message</h2>
              <p className="text-gray-500">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Prénom
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Nom
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Sujet
                </label>
                <Select name="subject" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reservation">Réservation</SelectItem>
                    <SelectItem value="information">Demande d'information</SelectItem>
                    <SelectItem value="reclamation">Réclamation</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Votre message..."
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Nos coordonnées</h2>
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Adresse</h3>
                    <p className="text-gray-500">
                      123 Avenue des Voyages<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-gray-500">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-500">contact@travelco.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">Horaires d'ouverture</h3>
                    <p className="text-gray-500">
                      Lundi - Vendredi: 9h00 - 18h00<br />
                      Samedi: 10h00 - 16h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615509614!3d48.858370079287475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647874587931!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Comment puis-je réserver un voyage ?</AccordionTrigger>
              <AccordionContent>
                Vous pouvez réserver un voyage directement sur notre site web, par téléphone ou en nous rendant visite dans notre agence. Notre équipe se fera un plaisir de vous aider à planifier votre voyage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Quels sont les modes de paiement acceptés ?</AccordionTrigger>
              <AccordionContent>
                Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), les virements bancaires et les paiements en plusieurs fois selon certaines conditions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Quelle est votre politique d'annulation ?</AccordionTrigger>
              <AccordionContent>
                Notre politique d'annulation varie selon le type de voyage et la période. Nous vous recommandons de souscrire à une assurance voyage pour plus de tranquillité.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Proposez-vous des voyages sur mesure ?</AccordionTrigger>
              <AccordionContent>
                Oui, nous proposons des voyages personnalisés adaptés à vos envies et à votre budget. Contactez-nous pour discuter de votre projet de voyage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>

    <PartenaireSection/>
  </main>
  )
}

export default ContactPage