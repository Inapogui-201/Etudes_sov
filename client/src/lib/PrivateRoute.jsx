import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { AlertCircle, Home, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

export default function PrivateRoute() {
  const navigate = useNavigate()
  const { currentAdmin } = useSelector((state) => state.admin)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!currentAdmin) {
      navigate("/admin/auth/connexion/")
    }
  }, [currentAdmin, navigate])

  if (!currentAdmin) {
    return (
      <div className="container flex items-center justify-center min-h-[50vh] px-4 py-12">
        <Card className={`w-full max-w-lg transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}>
          <CardHeader>
            <Alert variant="warning" className="border-warning/50 bg-warning/10">
              <AlertCircle className="h-5 w-5 text-warning" />
              <AlertTitle className="text-warning">Attention</AlertTitle>
              <AlertDescription className="text-warning/90">
                Vous n&apos;êtes pas autorisé à accéder à cette page
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Pour accéder à cette page, vous devez être connecté avec les permissions appropriées.
              Veuillez vous connecter ou retourner à la page d&apos;accueil.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="default"
              asChild
              className="gap-2"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                Retour accueil
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return <Outlet />
}

