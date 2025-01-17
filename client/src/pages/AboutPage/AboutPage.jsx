import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Clock } from "lucide-react";
import ServiceSection from "@/components/content/ServiceSection";
import MEMBER1 from "/images/member1.jpg";
import { teams } from "@/lib/data";
import PartenaireSection from "@/components/content/PartenaireSection";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              À Propos de Sov Etude
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Depuis 2008, nous créons des expériences de voyage uniques et
              mémorables pour nos clients. Notre passion pour le voyage et notre
              expertise nous permettent de vous offrir des services
              exceptionnels.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="space-y-2">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-bold">15k+</CardTitle>
                <p className="text-sm text-gray-500">Clients Satisfaits</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="space-y-2">
                <Target className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-bold">50+</CardTitle>
                <p className="text-sm text-gray-500">Destinations</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="space-y-2">
                <Award className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-bold">15</CardTitle>
                <p className="text-sm text-gray-500">Années d'expérience</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="space-y-2">
                <Clock className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-bold">24/7</CardTitle>
                <p className="text-sm text-gray-500">Support Client</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Notre Équipe
            </h2>
            <p className="mt-4 text-gray-500">
              Une équipe passionnée de professionnels du voyage à votre service
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {teams.map((member) => (
              <Card key={member} className="overflow-hidden">
                <div className="relative w-full h-64">
                  <img
                    src={member.image}
                    alt={`Team Member ${member.name}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* President's Message */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-square">
              <img
                src={MEMBER1}
                alt="Sov étude agence voyage Président profil"
                fill
                className="object-cover h-[500px] w-[500px] rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter">
                Mot du Président
              </h2>
              <blockquote className="text-lg text-gray-500 italic">
                "Notre mission est de transformer chaque voyage en une
                expérience inoubliable. Nous nous engageons à offrir un service
                d'excellence et à créer des moments magiques pour nos clients."
              </blockquote>
              <div className="space-y-1">
                <p className="font-semibold">Jean Dupont</p>
                <p className="text-sm text-gray-500">Président & Fondateur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServiceSection />

      {/* Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Notre Approche
            </h2>
            <p className="mt-4 text-gray-500">
              Comment nous travaillons pour vous offrir la meilleure expérience
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Consultation",
                description:
                  "Nous écoutons vos envies et besoins pour comprendre vos attentes.",
              },
              {
                step: "2",
                title: "Planification",
                description:
                  "Nous élaborons un itinéraire personnalisé selon vos préférences.",
              },
              {
                step: "3",
                title: "Organisation",
                description:
                  "Nous gérons toute la logistique pour un voyage sans stress.",
              },
              {
                step: "4",
                title: "Accompagnement",
                description: "Nous vous assistons pendant tout votre voyage.",
              },
            ].map((item) => (
              <Card key={item.step}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Evenements
            </h2>
            <p className="mt-4 text-gray-500">
              Restez informé des dernières nouvelles et découvrez nos conseils
              voyage
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {[
              {
                title: "Les 10 plus belles plages de Bali",
                date: "12 Jan 2024",
                image:
                  "https://cdn.pixabay.com/photo/2017/05/22/07/20/press-2333329_640.jpg",
                description:
                  "Découvrez notre sélection des plus belles plages de Bali pour votre prochain voyage.",
              },
              {
                title: "Guide de la street food à Bangkok",
                date: "10 Jan 2024",
                image:
                  "https://cdn.pixabay.com/photo/2015/10/17/20/52/work-993353_640.jpg",
                description:
                  "Les meilleurs spots pour déguster la cuisine de rue thaïlandaise.",
              },
              {
                title: "Safari en Tanzanie : Guide complet",
                date: "8 Jan 2024",
                image:
                  "https://cdn.pixabay.com/photo/2013/05/17/07/12/elephant-111695_640.jpg",
                description:
                  "Tout ce que vous devez savoir pour organiser votre safari en Tanzanie.",
              },
            ].map((post) => (
              <Card key={post.title} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="font-semibold text-lg mt-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {post.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to={"/actualites"}>  <Button variant="outline" size="lg">
              Voir plus d'articles
            </Button>
            </Link>
          
          </div>
        </div>
      </section>
      <PartenaireSection />
    </main>
  );
};

export default AboutPage;
