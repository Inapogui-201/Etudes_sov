import { Button } from "@/components/ui/button";
import { posts } from "@/lib/data";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

const SinglePost = () => {
  const params = useParams();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
            <Button asChild>
              <Link to={"/actualites"}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux actualités
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 to-gray-900/25">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full opacity-70"
          />
        </div>
        <div className="relative container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-white relative z-10">
            <Button
              asChild
              variant="outline"
              className="mb-8 bg-white/10 hover:bg-white/20"
            >
              <Link to="/actualites" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour aux actualités
              </Link>
            </Button>
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                {post.category}
              </span>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-gray max-w-none">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-gray-500">Auteur</p>
                </div>
                <Button asChild>
                  <Link to={"/actualites"}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux actualités
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SinglePost;
