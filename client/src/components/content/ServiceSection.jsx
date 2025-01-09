import React from 'react'
import { Plane, Hotel, Car } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { services } from '@/lib/data'
import { Link } from 'react-router-dom'

const ServiceSection = () => {
  return (
    <section className="py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Services</h2>
          <p className="text-gray-500 md:text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de services pour rendre votre voyage inoubliable
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full"><Link to={service.link}>En savoir plus</Link></Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection