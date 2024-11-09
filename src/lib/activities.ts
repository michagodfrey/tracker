// src/lib/activities.ts
import { prisma } from "./prisma";
import { Activity as PrismaActivity } from "@prisma/client";

// Add artificial delay in development
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type CreateActivityInput = Omit<
  PrismaActivity,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export async function createActivity(
  userId: string,
  data: CreateActivityInput
): Promise<PrismaActivity> {
  return prisma.activity.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function getTodayActivities(
  userId: string
): Promise<PrismaActivity[]> {
  // Add artificial delay in development
  // if (process.env.NODE_ENV === "development") {
  //   await delay(1000); // 1 second delay
  // }

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

export async function getWeeklyActivities(
  userId: string
): Promise<PrismaActivity[]> {
  // Add artificial delay in development
  // if (process.env.NODE_ENV === "development") {
  //   await delay(1500); // 1.5 second delay
  // }

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date();
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return prisma.activity.findMany({
    where: {
      userId,
      timestamp: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });
}
