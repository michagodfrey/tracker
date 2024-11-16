"use client";

import { Activity } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { subDays, format } from "date-fns";

interface ActivityOverviewProps {
  activities: Activity[];
}

export function ActivityOverview({ activities }: ActivityOverviewProps) {
  // Prepare data for last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dayActivities = activities.filter(
      (a) =>
        format(new Date(a.timestamp), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );

    return {
      date: format(date, "EEE"),
      meals: dayActivities.filter((a) => a.type === "MEAL").length,
      exercise: dayActivities.filter((a) => a.type === "EXERCISE").length,
      wakeups: dayActivities.filter((a) => a.type === "WAKE_UP").length,
    };
  }).reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7Days}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="meals" name="Meals" fill="#22c55e" />
              <Bar dataKey="exercise" name="Exercise" fill="#3b82f6" />
              <Bar dataKey="wakeups" name="Wake-ups" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
