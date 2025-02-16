import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartData } from "@/lib/data";
import { Card } from "@/components/ui/card";
const ChartSection = () => {
  return (
    <Card className="md:col-span-3 p-6">
      <div className="flex flex-col space-y-4">
        <h3 className="font-semibold text-lg">Aperçu Analytique</h3>
        <ChartContainer
          config={{
            total: {
              label: "Total",
              color: "hsl(var(--primary))",
            },
            sales: {
              label: "Ventes",
              color: "hsl(var(--success))",
            },
            visits: {
              label: "Visites",
              color: "hsl(var(--info))",
            },
          }}
          className="h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "hsl(var(--primary))" },
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "hsl(var(--success))" },
                }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "hsl(var(--info))" },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default ChartSection;
