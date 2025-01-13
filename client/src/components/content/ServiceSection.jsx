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
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[200%] bg-blue-50/50 -skew-y-12" />
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mt[-100px]">
        {/* Header section with enhanced styling */}
        <div className="relative text-center space-y-4 mb-16  mt[-100px]">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl bg-clip-text ">
            Nos Services
          </h2>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de services pour rendre votre voyage inoubliable
          </p>
        </div>

        {/* Services grid with enhanced cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 border-t-4 border-t-transparent hover:border-primary"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {`Service ${index + 1}`}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={service.link} className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full group/button hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/button:translate-x-1 transition-transform duration-300" />
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