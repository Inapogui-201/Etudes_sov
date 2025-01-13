import React, { useState } from 'react'
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Search, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

const AppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      date: new Date(2025, 0, 15),
      time: "10:00",
      type: "Découverte",
      email: "jean.dupont@email.com",
      phone: "0612345678",
      status: "pending",
      participants: 2,
      message: "Je souhaite planifier un voyage en famille"
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Martin",
      date: new Date(2025, 0, 16),
      time: "14:30",
      type: "Consultation",
      email: "marie.martin@email.com",
      phone: "0623456789",
      status: "pending",
      participants: 4,
      message: "Besoin de conseils pour voyage de noces"
    }
  ])

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [actionType, setActionType] = useState(null)
  const [actionFeedback, setActionFeedback] = useState(null)

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment
      )
    )
    
    // Simuler l'envoi d'un email au client
    const appointment = appointments.find(a => a.id === appointmentId)
    const statusMessage = {
      confirmed: "confirmé",
      cancelled: "annulé",
      pending: "en attente"
    }
    
    setActionFeedback({
      type: newStatus === 'confirmed' ? 'success' : 'info',
      message: `Le rendez-vous a été ${statusMessage[newStatus]}. Un email de notification a été envoyé à ${appointment.email}.`
    })
    
    setTimeout(() => {
      setActionFeedback(null)
    }, 5000)
    
    setConfirmDialogOpen(false)
  }

  const handleActionClick = (appointment, action) => {
    setSelectedAppointment(appointment)
    setActionType(action)
    setConfirmDialogOpen(true)
  }

  // Filtre des rendez-vous
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      `${appointment.firstName} ${appointment.lastName} ${appointment.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    
    const matchesStatus = 
      statusFilter === 'all' || appointment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section avec plus d'espace */}
      <section className="bg-white py-16 border-b">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900">
              Gestion des rendez-vous
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Consultez et gérez les rendez-vous clients en toute simplicité
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Alert avec animation */}
      {actionFeedback && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
          <Alert variant={actionFeedback.type === 'success' ? 'default' : 'destructive'}>
            <AlertDescription className="text-sm">
              {actionFeedback.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Section des filtres avec plus d'espace */}
      <section className="py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-base font-medium">Rechercher un rendez-vous</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Nom, email ou téléphone..."
                    className="pl-10 py-6 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-base font-medium">Filtrer par statut</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="py-6 text-lg">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rendez-vous</SelectItem>
                    <SelectItem value="confirmed">Rendez-vous confirmés</SelectItem>
                    <SelectItem value="pending">En attente de confirmation</SelectItem>
                    <SelectItem value="cancelled">Rendez-vous annulés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Liste des rendez-vous avec design responsive */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* En-tête adaptative */}
              <div className="hidden lg:grid lg:grid-cols-7 gap-6 p-6 bg-gray-50 border-b text-sm font-medium text-gray-500">
                <div className="col-span-2">Informations client</div>
                <div className="col-span-2">Date et heure</div>
                <div>Type</div>
                <div>Statut</div>
                <div>Actions</div>
              </div>

              {/* Liste responsive */}
              <div className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    {/* Version mobile */}
                    <div className="lg:hidden space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">
                            {appointment.firstName} {appointment.lastName}
                          </h3>
                          <p className="text-gray-600">{appointment.email}</p>
                        </div>
                        <StatusBadge status={appointment.status} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="mr-2 h-5 w-5" />
                          {format(appointment.date, "PPP", { locale: fr })}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="mr-2 h-5 w-5" />
                          {appointment.time}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <AppointmentActions 
                          appointment={appointment}
                          onActionClick={handleActionClick}
                          onViewDetails={() => setSelectedAppointment(appointment)}
                        />
                      </div>
                    </div>

                    {/* Version desktop */}
                    <div className="hidden lg:grid lg:grid-cols-7 gap-6 items-center">
                      <div className="col-span-2">
                        <div className="font-medium text-lg">
                          {appointment.firstName} {appointment.lastName}
                        </div>
                        <div className="text-gray-600">
                          {appointment.email}
                        </div>
                        <div className="text-gray-600">
                          {appointment.phone}
                        </div>
                      </div>
                      
                      <div className="col-span-2 space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="mr-2 h-5 w-5" />
                          {format(appointment.date, "PPP", { locale: fr })}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="mr-2 h-5 w-5" />
                          {appointment.time}
                        </div>
                      </div>
                      
                      <div className="text-gray-600">
                        {appointment.type}
                      </div>
                      
                      <div>
                        <StatusBadge status={appointment.status} />
                      </div>
                      
                      <div className="flex gap-2">
                        <AppointmentActions 
                          appointment={appointment}
                          onActionClick={handleActionClick}
                          onViewDetails={() => setSelectedAppointment(appointment)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Composants de dialogue améliorés */}
      <ConfirmationDialog 
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        appointment={selectedAppointment}
        actionType={actionType}
        onConfirm={(id, status) => handleStatusChange(id, status)}
      />

      <DetailsDialog 
        open={!!selectedAppointment && !confirmDialogOpen}
        onOpenChange={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
        onActionClick={handleActionClick}
      />
    </main>
  )
}

// Composant pour le badge de statut
const StatusBadge = ({ status }) => {
  const statusConfig = {
    confirmed: {
      icon: CheckCircle,
      text: 'Confirmé',
      className: 'bg-green-100 text-green-800'
    },
    pending: {
      icon: AlertCircle,
      text: 'En attente',
      className: 'bg-yellow-100 text-yellow-800'
    },
    cancelled: {
      icon: XCircle,
      text: 'Annulé',
      className: 'bg-red-100 text-red-800'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${config.className}`}>
      <Icon className="h-4 w-4" />
      {config.text}
    </span>
  )
}

// Composant pour les actions
const AppointmentActions = ({ appointment, onActionClick, onViewDetails }) => {
  return (
    <>
      {appointment.status === 'pending' && (
        <>
          <Button
            variant="default"
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => onActionClick(appointment, 'confirm')}
          >
            Confirmer
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onActionClick(appointment, 'cancel')}
          >
            Refuser
          </Button>
        </>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={onViewDetails}
      >
        Voir détails
      </Button>
    </>
  )
}

// Dialogue de confirmation
const ConfirmationDialog = ({ open, onOpenChange, appointment, actionType, onConfirm }) => {
  if (!appointment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {actionType === 'confirm' ? 'Confirmer le rendez-vous' : 'Refuser le rendez-vous'}
          </DialogTitle>
          <DialogDescription className="mt-4 space-y-4">
            <p>
              Êtes-vous sûr de vouloir {actionType === 'confirm' ? 'confirmer' : 'refuser'} ce rendez-vous ?
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="font-medium">
                {appointment.firstName} {appointment.lastName}
              </p>
              <p className="text-gray-600">
                {format(appointment.date, "PPP", { locale: fr })} à {appointment.time}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button
            variant={actionType === 'confirm' ? 'default' : 'destructive'}
            onClick={() => onConfirm(
              appointment.id,
              actionType === 'confirm' ? 'confirmed' : 'cancelled'
            )}
          >
            {actionType === 'confirm' ? 'Confirmer' : 'Refuser'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Dialogue des détails
const DetailsDialog = ({ open, onOpenChange, appointment, onActionClick }) => {
  if (!appointment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Détails du rendez-vous
          </DialogTitle>
          <DialogDescription>
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <h4 className="text-base font-medium">Client</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-medium text-lg">
                    {appointment.firstName} {appointment.lastName}
                  </p>
                  <p className="text-gray-600">
                    {appointment.email}
                  </p>
                  <p className="text-gray-600">
                    {appointment.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-medium">Rendez-vous</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Date :</span> {format(appointment.date, "PPP", { locale: fr })}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Heure :</span> {appointment.time}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Type :</span> {appointment.type}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Participants :</span> {appointment.participants}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-medium">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    {appointment.message || "Aucun message"}
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 flex justify-end gap-3">
          {appointment.status === 'pending' && (
            <>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  onOpenChange(false)
                  onActionClick(appointment, 'confirm')
                }}
              >
                Confirmer
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onOpenChange(false)
                  onActionClick(appointment, 'cancel')
                }}
              >
                Refuser
              </Button>
              </>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// CSS personnalisé pour l'animation du feedback
const styles = {
  '@keyframes slideIn': {
    '0%': {
      transform: 'translateX(100%)',
      opacity: 0
    },
    '100%': {
      transform: 'translateX(0)',
      opacity: 1
    }
  },
  '.animate-slide-in': {
    animation: 'slideIn 0.3s ease-out'
  }
}

export default AppointmentsPage