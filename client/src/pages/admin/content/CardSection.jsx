import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; 
import React from "react";

const CardSection = () => {
  const [destinations, setDestinations] = useState(null);
  const [events, setEvents] = useState(null);
  const [testimonies, setTestimonies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destinationsResponse = await fetch("/api/destinations");
        const eventsResponse = await fetch("/api/events");
        const testimoniesResponse = await fetch("/api/testimony");

        if (destinationsResponse.ok && eventsResponse.ok && testimoniesResponse.ok) {
          const destinationsData = await destinationsResponse.json();
          const eventsData = await eventsResponse.json();
          const testimoniesData = await testimoniesResponse.json();

          setDestinations(destinationsData.destinations.length); 
          setEvents(eventsData.length); 
          setTestimonies(testimoniesData.testimonies.length); 
        } else {
          throw new Error("Erreur lors du chargement des données");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex justify-center items-center">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </Card>
        <Card className="p-6 flex justify-center items-center">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </Card>
        <Card className="p-6 flex justify-center items-center">
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Total Destinations</span>
          <span className="text-2xl font-bold">{destinations}</span>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Total Evenements</span>
          <span className="text-2xl font-bold">{events}</span>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Total Témoignages</span>
          <span className="text-2xl font-bold">{testimonies}</span>
        </div>
      </Card>
    </div>
  );
};

export default CardSection;
