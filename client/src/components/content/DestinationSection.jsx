import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { destinations } from "@/lib/data";

const DestinationSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
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
                <h3 className="text-xl font-bold">{destination.title}</h3>
                <p className="text-gray-500">{destination.shortDescription}</p>
                <p className="font-semibold mt-2">{destination.price}</p>
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
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Voir toutes les destinations
          </Button>
        </div>

        <Dialog
          open={!!selectedDestination}
          onOpenChange={() => setSelectedDestination(null)}
        >
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
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <p className="mt-4">{selectedDestination.fullDescription}</p>
              <p className="font-bold text-lg mt-4">
                {selectedDestination.price}
              </p>
              <Button className="w-full mt-4">Réserver maintenant</Button>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};

export default DestinationSection;
