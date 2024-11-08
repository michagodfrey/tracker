"use client";

import { useState } from "react";

type ActivityType = "meal" | "exercise" | "wakeup";

interface ActivityFormData {
    type: ActivityType;
    time: string;
    notes?: string;
    mealType?: "breakfast" | "lunch" | "dinner" | "snack";
    exerciseDuration?: number;
    exerciseType?: string;
    }

    export function QuickEntryForm() {
    const [activityType, setActivityType] = useState<ActivityType>("meal");
    const [formData, setFormData] = useState<ActivityFormData>({
        type: "meal",
        time: new Date().toISOString().slice(0, 16), // Current time in YYYY-MM-DDTHH:mm format
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting:", formData);
        // TODO: Add API call to save data
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Activity Type</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setActivityType("meal");
                setFormData((prev) => ({ ...prev, type: "meal" }));
              }}
              className={`px-3 py-1 rounded-md ${
                activityType === "meal"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100"
              }`}
            >
              Meal
            </button>
            <button
              type="button"
              onClick={() => {
                setActivityType("exercise");
                setFormData((prev) => ({ ...prev, type: "exercise" }));
              }}
              className={`px-3 py-1 rounded-md ${
                activityType === "exercise"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100"
              }`}
            >
              Exercise
            </button>
            <button
              type="button"
              onClick={() => {
                setActivityType("wakeup");
                setFormData((prev) => ({ ...prev, type: "wakeup" }));
              }}
              className={`px-3 py-1 rounded-md ${
                activityType === "wakeup"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100"
              }`}
            >
              Wake Up
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Time
            <input
              type="datetime-local"
              value={formData.time}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, time: e.target.value }))
              }
              className="w-full rounded-md border border-gray-300 px-3 py-1"
            />
          </label>
        </div>

        {activityType === "meal" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Meal Type
              <select
                value={formData.mealType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    mealType: e.target.value as ActivityFormData["mealType"],
                  }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-1"
              >
                <option value="">Select meal type...</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </label>
          </div>
        )}

        {activityType === "exercise" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Exercise Type</label>
              <input
                type="text"
                placeholder="e.g., Running, Yoga, Weights"
                value={formData.exerciseType || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    exerciseType: e.target.value,
                  }))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Duration (minutes)
                <input
                  type="number"
                  min="1"
                  value={formData.exerciseDuration || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      exerciseDuration: parseInt(e.target.value),
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-1"
                />
              </label>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-1"
            rows={2}
            placeholder="Add any additional notes..."
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          Save Activity
        </button>
      </form>
    );
}
