// src/app/(protected)/entries/page.tsx
"use client";

import { useState } from "react";
import { Activity } from "@prisma/client";
import { EntriesFilter } from "@/components/entries/entries-filter";
import { EntriesList } from "@/components/entries/entries-list";
import { EntriesCalendar } from "@/components/entries/entries-calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface EntriesPageProps {
  initialActivities: Activity[];
}

export default function EntriesPage({ initialActivities }: EntriesPageProps) {
  const [filteredActivities, setFilteredActivities] =
    useState(initialActivities);

  const handleFilterChange = (
    filter: "ALL" | "MEAL" | "EXERCISE" | "WAKE_UP"
  ) => {
    if (filter === "ALL") {
      setFilteredActivities(initialActivities);
    } else {
      setFilteredActivities(
        initialActivities.filter((activity) => activity.type === filter)
      );
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Activity Entries</h1>
        <p className="text-muted-foreground">
          View and manage your activity history
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr] mt-8">
        <div className="space-y-4">
          <EntriesFilter onFilterChange={handleFilterChange} />
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View activities by date</CardDescription>
            </CardHeader>
            <CardContent>
              <EntriesCalendar activities={filteredActivities} />
            </CardContent>
          </Card>
        </div>
        <EntriesList activities={filteredActivities} />
      </div>
    </div>
  );
}
