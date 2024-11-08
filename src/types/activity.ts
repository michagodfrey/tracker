// src/types/activity.ts
export type ActivityType = "MEAL" | "EXERCISE" | "WAKE_UP";

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  title: string;
  description?: string;
  duration?: number; // in minutes, for exercise
  calories?: number; // for meals and exercise
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}
