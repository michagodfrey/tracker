// src/components/stats/wake-up-analysis.tsx
"use client";

import { Activity } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface WakeUpAnalysisProps {
  activities: Activity[];
}

export function WakeUpAnalysis({ activities }: WakeUpAnalysisProps) {
  const wakeUpActivities = activities
    .filter((a) => a.type === "WAKE_UP")
    .map((activity) => {
      const date = new Date(activity.timestamp);
      return {
        date: format(date, "MMM dd"),
        time: date.getHours() + date.getMinutes() / 60,
      };
    })
    .sort((a, b) => a.time - b.time);

  // Calculate average wake-up time
  const averageWakeUpTime = wakeUpActivities.length
    ? wakeUpActivities.reduce((sum, curr) => sum + curr.time, 0) /
      wakeUpActivities.length
    : 0;

  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wake-up Time Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Average Wake-up Time</p>
          <p className="text-2xl font-bold">{formatTime(averageWakeUpTime)}</p>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <XAxis dataKey="date" />
              <YAxis
                domain={[4, 12]}
                ticks={[4, 6, 8, 10, 12]}
                tickFormatter={formatTime}
              />
              <Tooltip formatter={(value: number) => formatTime(value)} />
              <Scatter data={wakeUpActivities} fill="#f59e0b" dataKey="time" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
