// src/components/entries/entries-filter.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ACTIVITY_TYPES = ["ALL", "MEAL", "EXERCISE", "WAKE_UP"] as const;
type FilterType = (typeof ACTIVITY_TYPES)[number];

interface EntriesFilterProps {
  onFilterChange?: (filter: FilterType) => void;
}

export function EntriesFilter({ onFilterChange }: EntriesFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");

  const handleFilterClick = (type: FilterType) => {
    setActiveFilter(type);
    onFilterChange?.(type);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Activity Type</span>
            <div className="flex flex-col gap-2">
              {ACTIVITY_TYPES.map((type) => (
                <Button
                  key={type}
                  variant={type === activeFilter ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleFilterClick(type)}
                >
                  {type.replace("_", " ")}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
