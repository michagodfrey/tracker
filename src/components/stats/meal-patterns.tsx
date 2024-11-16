// src/components/stats/meal-patterns.tsx
"use client";

import { Activity } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface MealPatternsProps {
  activities: Activity[];
}

export function MealPatterns({ activities }: MealPatternsProps) {
  const mealActivities = activities.filter((a) => a.type === "MEAL");

  // Count meal types
  const mealCounts = mealActivities.reduce((acc, curr) => {
    acc[curr.title] = (acc[curr.title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(mealCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
