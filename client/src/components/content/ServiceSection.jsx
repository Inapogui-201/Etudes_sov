import React from 'react';
import { Plane, Hotel, Car, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from '@/lib/data';
import { Link } from 'react-router-dom';

const ServiceSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Nos Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de services pour rendre votre voyage inoubliable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
            >
              <CardHeader className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary/80 bg-primary/5 px-3 py-1 rounded-full">
                    {`Service ${index + 1}`}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <ul className="space-y-2">
                  {service.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mr-2 group-hover/item:bg-primary transition-colors duration-300" />
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Link to={service.link} className="w-full">
                  <Button 
                    className="w-full group/button bg-white hover:bg-primary text-primary hover:text-white border border-primary text-sm transition-all duration-300 h-9"
                  >
                    <span className="font-medium">En savoir plus</span>
                    <ArrowRight className="w-3 h-3 ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;