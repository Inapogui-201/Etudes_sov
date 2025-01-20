import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { posts } from "@/lib/data";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.slice(0, 3));
        //console.log(data);
      } catch (error) {
        setError(error.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredPosts = events.filter(
    (events) =>
      events.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    events.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    events.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Actualités & Evenements
            </h1>
            <p className="mt-4 text-gray-500">
              Découvrez nos derniers évenements, conseils et inspirations pour
              vos voyages
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <div className="relative aspect-video">
                  <img
                    src={post.medias}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                 
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-500">{post.content.slice(0,50)}{"..."}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      to={`/actualites/${post.slug}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Lire la suite
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Aucun article ne correspond à votre recherche.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
