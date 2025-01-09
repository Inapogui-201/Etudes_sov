import { Card } from "@/components/ui/card";
import React from "react";

const CardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Total Visites</span>
          <span className="text-2xl font-bold">5,400</span>
          <span className="text-sm text-green-500">
            +12% depuis le mois dernier
          </span>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Total Ventes</span>
          <span className="text-2xl font-bold">3,200</span>
          <span className="text-sm text-green-500">
            +8% depuis le mois dernier
          </span>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-muted-foreground">Total Revenue</span>
          <span className="text-2xl font-bold">4,000€</span>
          <span className="text-sm text-green-500">
            +15% depuis le mois dernier
          </span>
        </div>
      </Card>
    </div>
  );
};

export default CardSection;
