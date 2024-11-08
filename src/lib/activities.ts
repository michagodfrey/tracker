// src/lib/activities.ts
import { prisma } from "./prisma";
import type { Activity } from "@prisma/client";

export type CreateActivityInput = Omit<
  Activity,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export async function createActivity(
  userId: string,
  data: CreateActivityInput
): Promise<Activity> {
  return prisma.activity.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function getTodayActivities(userId: string): Promise<Activity[]> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.activity.findMany({
    where: {
      userId,
      timestamp: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });
}
