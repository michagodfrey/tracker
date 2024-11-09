// src/components/entries/entries-calendar.tsx
"use client";

import { Activity } from "@prisma/client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface EntriesCalendarProps {
  activities: Activity[];
}

export function EntriesCalendar({ activities }: EntriesCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Get dates with activities
  const datesWithActivities = activities.map(
    (activity) => new Date(activity.timestamp)
  );

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      modifiers={{
        hasActivity: datesWithActivities,
      }}
      modifiersStyles={{
        hasActivity: {
          fontWeight: "bold",
          backgroundColor: "hsl(var(--primary))",
          color: "white",
        },
      }}
    />
  );
}
