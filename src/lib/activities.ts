// src/lib/activities.ts
import { prisma } from "./prisma";
import { Activity as PrismaActivity } from "@prisma/client";

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
