import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

const DestinationSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
  
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`/api/destinations`);
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        const data = await response.json();
        
        const destinationsData = data.destinations || [];
        setDestinations(destinationsData.slice(0, 3)); 
      } catch (error) {
        setError(error.message || "Error fetching destinations");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDestinations();
  }, []);
  

  return (
    <section className="py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Destinations Populaires
          </h2>
          <p className="text-gray-500 md:text-lg max-w-2xl mx-auto">
            Découvrez nos destinations les plus prisées
          </p>
        </div>

        {loading && (
          <div className="text-center text-xl">Chargement des destinations...</div>
        )}

        {error && (
          <div className="text-center text-red-500 text-xl">{error}</div>
        )}

        {!loading && !error && ( 
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden">
                <div className="relative aspect-video w-full h-48">
                  <img
                    src={destination.image}
                    alt="Sov Etude agence de voyage"
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold">{destination.title}</h3>
                  <p className="text-gray-500">{destination.shortDescription}</p>
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
        )}

        {/* <Link to={"nos-destinations"} className="text-center mt-12">
          <Button variant="outline" size="lg">
            Voir toutes les destinations
          </Button>
        </Link> */}

        <Dialog
          open={!!selectedDestination}
          onOpenChange={() => setSelectedDestination(null)}
        >
          {selectedDestination && (
            <DialogContent className="max-w-3xl mx-auto p-6 overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>{selectedDestination.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 w-full h-64">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <p className="mt-4">{selectedDestination.fullDescription}</p>
              <Link to={"/nous-contacter"}>
                <Button className="w-full mt-4">Nous contacter</Button>
              </Link>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default DestinationSection;
