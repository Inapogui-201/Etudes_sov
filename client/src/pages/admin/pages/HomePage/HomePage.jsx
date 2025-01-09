import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import NavBar from "../../content/NavBar";
import CardSection from "../../content/CardSection";
import ChartSection from "../../content/ChartSection";

const HomePages = () => {
  return (
    <>
        <div className="grid gap-6">
          {/* Top Cards */}
          <CardSection />
        </div>
        {/* Chart and Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
          {/* Chart Area */}
          <ChartSection />
          {/* Add Post Form */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Ajouter un post</h3>
              <div className="space-y-4">
                <Input placeholder="Titre" />
                <Input placeholder="Description" />
                <Input placeholder="Catégorie" />
                <Input placeholder="Tags" />
                <Button className="w-full">ajouter</Button>
              </div>
            </div>
          </Card>
        </div>
    </>
  );
};

export default HomePages;
