import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { continents, destinations } from "@/lib/data";
import { Search } from "lucide-react";
import ServiceSection from "@/components/content/ServiceSection";
import PartenaireSection from "@/components/content/PartenaireSection";

const DestinationPage = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesContinent =
      selectedContinent === "all" ||
      destination.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <main>
    {/* Hero Section */}
    <section className="relative py-24">
      <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2018/05/10/21/34/travel-3388831_960_720.jpg')] bg-cover bg-center bg-no-repeat brightness-50" />
      <div className="relative container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Découvrez Nos Destinations
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Explorez notre sélection de destinations à travers le monde et trouvez votre prochaine aventure
          </p>
        </div>
      </div>
    </section>

    {/* Filters Section */}
    <section className="py-8 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher une destination..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select value={selectedContinent} onValueChange={setSelectedContinent}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filtrer par continent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les continents</SelectItem>
              {continents.map((continent) => (
                <SelectItem key={continent.value} value={continent.value}>
                  {continent.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>

    {/* Destinations Grid */}
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{destination.title}</h3>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {destination.rating} / 5
                  </span>
                </div>
                <p className="text-gray-500">{destination.shortDescription}</p>
                <p className="font-semibold mt-2">{destination.price}</p>
                <p className="text-sm text-gray-500">{destination.duration}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedDestination(destination)}
                >
                  En savoir plus
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune destination ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </section>

    {/* Destination Details Modal */}
    <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
      {selectedDestination && (
        <DialogContent className="max-w-3xl mx-auto p-6 overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedDestination.title}</DialogTitle>
            <DialogDescription>
              {selectedDestination.duration}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 w-full h-64">
            <img
              src={selectedDestination.image}
              alt={selectedDestination.title}
              fill
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p>{selectedDestination.fullDescription}</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">{selectedDestination.price}</p>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Note: {selectedDestination.rating} / 5
              </span>
            </div>
          </div>
          <Button className="w-full mt-4">Réserver maintenant</Button>
        </DialogContent>
      )}
    </Dialog>
    <ServiceSection/>
    <PartenaireSection/>
  </main>
  );
};

export default DestinationPage;
