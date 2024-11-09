// src/components/dashboard/weekly-overview.tsx
import { Activity } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getWeeklyActivities } from "@/lib/activities";


interface WeeklyOverviewProps {
  userId: string;
}

interface DailyActivities {
  [date: string]: Activity[];
}

export async function WeeklyOverview({ userId }: WeeklyOverviewProps) {
  const activities = await getWeeklyActivities(userId);

  // Group activities by day
  const dailyActivities = activities.reduce<DailyActivities>(
    (acc, activity) => {
      const date = new Date(activity.timestamp).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(activity);
      return acc;
    },
    {}
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
        <CardDescription>
          Your activity patterns for the past 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(dailyActivities).map(([date, dayActivities]) => (
            <div key={date} className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "short",
                })}
              </div>
              <div className="flex-1 space-y-1">
                {dayActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-lg bg-muted p-2"
                  >
                    <span className="text-sm font-medium">
                      {activity.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
