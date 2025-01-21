import React from "react";
import { useState } from "react";
import { Plane, ChevronDown, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { services } from "@/lib/data";
import LOGO from "/images/logo1.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to={"/"} className="flex items-center space-x-2">
          <img src={LOGO} alt="Sov-Etude-2.0" className="h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to={"/"} className="text-sm font-medium hover:text-primary">
            Accueil
          </Link>
          <Link
            to={"/a-propos"}
            className="text-sm font-medium hover:text-primary"
          >
            A propos
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={service.link}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {service.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            to={"/nos-destinations"}
            className="text-sm font-medium hover:text-primary"
          >
            Destination
          </Link>
          <Link
            to={"/temoignage"}
            className="text-sm font-medium hover:text-primary"
          >
            Temoignages
          </Link>
          {/* <Link
            to={"/nous-contacter"}
            className="text-sm font-medium hover:text-primary"
          >
            Contact
          </Link> */}
        </nav>

        <Link to={"/nous-contacter"} className="hidden md:block">
          <Button>Nous Contacter</Button>
        </Link>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              <Link to={"/"} className="text-sm font-medium">
                Accueil
              </Link>
              <Link to={"/a-propos"} className="text-sm font-medium">
                A propos
              </Link>
              <div className="space-y-4">
                <div className="font-medium">Services</div>
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      to={service.link}
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to={"/destination"} className="text-sm font-medium">
                Destination
              </Link>
              <Link to={"/nous-contacter"} className="text-sm font-medium">
                Contact
              </Link>
              <Link to={"/prendre-rendez-vous"} className="text-sm font-medium">
                Rendez-vous
              <Button className="w-full">Rendez-vous</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navigation;
