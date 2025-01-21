import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { toast, Toaster } from "sonner"

const RendezVousPage = () => {
  const [service, setService] = useState("")
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const services = ["etudier-à-l-étranger", "tourisme", "évacuation-sanitaire", "billeterie"]

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Vérifier si tous les champs sont remplis
    if (
      !formData.fname ||
      !formData.lname ||
      !formData.email ||
      !formData.phone ||
      !formData.service
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Effectuer la requête POST vers l'API
    try {
      const response = await fetch("/api/appointment/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        // Si la réponse de l'API n'est pas ok, afficher l'erreur
        toast.error(data.message || "Erreur lors de la prise du rendez-vous")
        return
      }

      // Si tout se passe bien, afficher un message de succès
      toast.success("Rendez-vous confirmé !")
      // Réinitialiser le formulaire après soumission
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
      setService("") // Réinitialiser le service sélectionné
    } catch (error) {
      // Gestion des erreurs de serveur
      toast.error("Une erreur est survenue, veuillez réessayer plus tard.")
    }
  }

  return (
    <main>
      <Toaster position="top-right" />
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prenez rendez-vous</h1>
            <p className="mt-4 text-gray-500">
              Réservez un créneau avec l'un de nos experts pour planifier votre prochain rendez-vous
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-6">

                {/* Type de service */}
                <div className="space-y-2">
                  <Label>Type de service</Label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map((serviceOption) => (
                      <option key={serviceOption} value={serviceOption}>
                        {serviceOption}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Informations personnelles */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={formData.fname}
                      onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={formData.lname}
                      onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <textarea
                    id="message"
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Confirmer le rendez-vous
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RendezVousPage
