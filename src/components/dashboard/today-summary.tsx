// src/components/dashboard/today-summary.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Activity } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader2Icon, RefreshCcwIcon } from "lucide-react";
import { TodaySummaryCardSkeleton } from "./activity-skeleton";

interface TodaySummaryProps {
  initialActivities: Activity[];
}

export function TodaySummary({ initialActivities }: TodaySummaryProps) {
  const [activities, setActivities] = useState(initialActivities);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const refreshActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      const { data } = await response.json();
      setActivities(data);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to refresh activities. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const interval = setInterval(refreshActivities, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [refreshActivities]);

  const stats = {
    meals: activities.filter((a) => a.type === "MEAL").length,
    exercise: activities
      .filter((a) => a.type === "EXERCISE")
      .reduce((acc, curr) => acc + (curr.duration ?? 0), 0),
    wakeUp: activities.find((a) => a.type === "WAKE_UP")?.timestamp,
  };

  if (isLoading) {
    return <TodaySummaryCardSkeleton />;
  }

  return (
    <Card className={isLoading ? "opacity-60" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Today&apos;s Summary</CardTitle>
          <CardDescription>Your progress for the day</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshActivities}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcwIcon className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Meals logged</span>
            <span className="font-medium">{stats.meals}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Exercise (mins)</span>
            <span className="font-medium">{stats.exercise}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Wake up time</span>
            <span className="font-medium">
              {stats.wakeUp
                ? new Date(stats.wakeUp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Not logged"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
