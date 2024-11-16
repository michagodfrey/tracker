"use client";

import { Activity } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { subDays, format } from "date-fns";

interface ExerciseStatsProps {
  activities: Activity[];
}

export function ExerciseStats({ activities }: ExerciseStatsProps) {
  const exerciseActivities = activities.filter((a) => a.type === "EXERCISE");

  // Calculate daily exercise duration for the last 14 days
  const exerciseData = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dayExercises = exerciseActivities.filter(
      (a) =>
        format(new Date(a.timestamp), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );

    return {
      date: format(date, "MMM dd"),
      duration: dayExercises.reduce(
        (sum, curr) => sum + (curr.duration || 0),
        0
      ),
    };
  }).reverse();

  // Calculate averages
  const totalDuration = exerciseActivities.reduce(
    (sum, curr) => sum + (curr.duration || 0),
    0
  );
  const averageDuration = exerciseActivities.length
    ? Math.round(totalDuration / exerciseActivities.length)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Patterns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Average Duration</p>
          <p className="text-2xl font-bold">{averageDuration} minutes</p>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={exerciseData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
