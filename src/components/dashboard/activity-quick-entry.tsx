// src/components/dashboard/activity-quick-entry.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ActivityType } from "@/types/activity";
import { Loader2Icon } from "lucide-react";

type SubType = {
  MEAL: ["Breakfast", "Lunch", "Dinner", "Snack"];
  EXERCISE: ["Running", "Walking", "Cycling", "Gym", "Other"];
  WAKE_UP: ["Regular", "Early", "Late"];
};

const ACTIVITY_SUBTYPES: SubType = {
  MEAL: ["Breakfast", "Lunch", "Dinner", "Snack"],
  EXERCISE: ["Running", "Walking", "Cycling", "Gym", "Other"],
  WAKE_UP: ["Regular", "Early", "Late"],
} as const;

export function ActivityQuickEntry() {
    const router = useRouter();
    const { toast } = useToast();
    const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
    const [subType, setSubType] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);

    const handleSubmit = async () => {
      if (!selectedType || !subType) return;

      setIsSubmitting(true);
      try {
        const activityData = {
          type: selectedType,
          title: subType,
          ...(duration && { duration }), // Only include if duration exists
          timestamp: new Date().toISOString(),
        };

        const response = await fetch("/api/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activityData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to create activity");
        }

        toast({
          title: "Activity Recorded",
          description: `Successfully recorded ${subType}`,
        });

        setSelectedType(null);
        setSubType(null);
        setDuration(null);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to record activity",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    };
  return (
   <Card>
      <CardHeader>
        <CardTitle>Quick Entry</CardTitle>
        <CardDescription>Record your activity in seconds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            {Object.keys(ACTIVITY_SUBTYPES).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => {
                  setSelectedType(type as ActivityType);
                  setSubType(null);
                }}
                disabled={isSubmitting}
              >
                {type.replace("_", " ")}
              </Button>
            ))}
          </div>

          {selectedType && (
            <div className="grid grid-cols-2 gap-2">
              {ACTIVITY_SUBTYPES[selectedType].map((type) => (
                <Button
                  key={type}
                  variant={subType === type ? "default" : "outline"}
                  onClick={() => setSubType(type)}
                  disabled={isSubmitting}
                >
                  {type}
                </Button>
              ))}
            </div>
          )}

          {selectedType === "EXERCISE" && subType && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Duration (minutes)
                <input
                  type="number"
                  value={duration || ""}
                  onChange={(e) => setDuration(parseInt(e.target.value) || null)}
                  className="w-full rounded-md border border-input px-3 py-2 mt-1"
                  placeholder="Enter duration"
                  min="1"
                  disabled={isSubmitting}
                />
              </label>
            </div>
          )}

          {selectedType && subType && (
            <Button 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isSubmitting || (selectedType === "EXERCISE" && !duration)}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Recording...
                </>
              ) : (
                "Record Activity"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
