import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  BookOpen,
  Calendar,
  Handshake,
  LogOut,
  Home,
  Map,
  User,
  Users,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LOGO from "/images/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/redux/adminSlice";
import { toast, Toaster } from "sonner";

const NavBar = () => {
  const location = useLocation();
  const { currentAdmin } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    setLoading(true); 
    setTimeout(async () => {
      try {
      
        await fetch("/api/admin/auth/signout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(signOut());
        navigate("/"); 
        toast.success("Vous êtes déconnecté avec succès !");
      } catch (error) {
        toast.error(error.message || "Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setLoading(false); 
      }
    }, 4000); 
  };

  return (
    <header className="border-b">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to={"/admin/dashboard/"}
              className="flex items-center space-x-2"
            >
              <img
                src={LOGO}
                alt="Sov-Etude service voyage etranger"
                className="h-12 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="flex items-center">
                <Link to={"/admin/dashboard/"} className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Accueil
                </Link>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Link to={"/admin/mon-blog/"} className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Blog
                </Link>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
              <Link to={"/admin/mon-destination/"} className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Destination
                </Link>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
              <Link to={"/admin/mon-rdv/"} className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Rendez-vous
                </Link>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Equipes
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Handshake className="h-4 w-4" />
                partenaires
              </Button>
            </nav>
          </div>
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src= { "https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp" || currentAdmin.profil} alt="Sov Etude" />
                  <AvatarFallback>SE</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentAdmin.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                  {currentAdmin.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link className="flex items-center" to={"/admin/mon-profil/"}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={handleSignOut}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
