import React, { useState } from 'react'
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast, Toaster } from "sonner"
import { appointmentTypes, timeSlots } from '@/lib/data'

const RendezVousPage = () => {
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [type, setType] = useState()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      participants: "",
      message: ""
    })
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      if (!date || !time || !type) {
        toast.error("Veuillez remplir tous les champs obligatoires")
        return
      }
  
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Rendez-vous confirmé ! Vous recevrez un email de confirmation.")
      // Réinitialiser le formulaire
      setDate(undefined)
      setTime(undefined)
      setType(undefined)
      setStep(1)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        participants: "",
        message: ""
      })
    }
  
    const handleNext = () => {
      if (step === 1 && (!date || !time)) {
        toast.error("Veuillez sélectionner une date et une heure")
        return
      }
      if (step === 2 && !type) {
        toast.error("Veuillez sélectionner un type de rendez-vous")
        return
      }
      setStep(step + 1)
    }
  
    const handleBack = () => {
      setStep(step - 1)
    }
  
  return (
    <main>
    {/* Hero Section */}
    <section className="bg-gray-50 py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Prenez rendez-vous
          </h1>
          <p className="mt-4 text-gray-500">
            Réservez un créneau avec l'un de nos experts voyage pour planifier votre prochaine aventure
          </p>
        </div>
      </div>
    </section>

    {/* Booking Form */}
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      step === s
                        ? "bg-primary text-primary-foreground"
                        : step > s
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={cn(
                        "w-24 h-1 mx-2",
                        step > s ? "bg-primary" : "bg-gray-100"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Date & Heure</span>
              <span className="text-sm text-gray-500">Type de RDV</span>
              <span className="text-sm text-gray-500">Informations</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Date du rendez-vous</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: fr }) : "Sélectionnez une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Heure du rendez-vous</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une heure">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time || "Sélectionnez une heure"}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Type de rendez-vous</Label>
                  <div className="grid gap-4">
                    {appointmentTypes.map((appointmentType) => (
                      <div
                        key={appointmentType.value}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border cursor-pointer",
                          type === appointmentType.value && "border-primary bg-primary/5"
                        )}
                        onClick={() => setType(appointmentType.value)}
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{appointmentType.label}</p>
                          <p className="text-sm text-gray-500">{appointmentType.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                  <Label htmlFor="participants">Nombre de participants</Label>
                  <Input
                    id="participants"
                    type="number"
                    min="1"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    required
                  />
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

                {/* Résumé de la réservation */}
                <div className="rounded-lg border p-4 space-y-2">
                  <h3 className="font-semibold">Résumé de votre rendez-vous</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Date : {date ? format(date, "PPP", { locale: fr }) : ""}</p>
                    <p>Heure : {time}</p>
                    <p>Type : {appointmentTypes.find(t => t.value === type)?.label}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Retour
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={handleNext} className="ml-auto">
                  Suivant
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Confirmer le rendez-vous
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
  )
}

export default RendezVousPage