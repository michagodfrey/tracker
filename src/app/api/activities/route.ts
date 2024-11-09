// src/app/api/activities/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createActivity, getTodayActivities } from "@/lib/activities";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Validation schema for activity creation
const createActivitySchema = z.object({
  type: z.enum(["MEAL", "EXERCISE", "WAKE_UP"]),
  title: z.string().min(1),
  description: z.string().optional(),
  duration: z.number().nullable().optional(),
  calories: z.number().nullable().optional(),
  timestamp: z.string().datetime(),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "You must be signed in to perform this action",
      },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    const validated = createActivitySchema.parse(data);

    const activity = await createActivity(session.user.id, {
      type: validated.type,
      title: validated.title,
      description: validated.description ?? null,
      duration: validated.duration ?? null,
      calories: validated.calories ?? null,
      timestamp: new Date(validated.timestamp),
    });

    return NextResponse.json({
      message: "Activity created successfully",
      data: activity,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Invalid activity data provided",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Failed to create activity:", error);
    return NextResponse.json(
      {
        error: "Server Error",
        message: "Failed to create activity",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "You must be signed in to view activities",
      },
      { status: 401 }
    );
  }

  try {
    const activities = await getTodayActivities(session.user.id);
    return NextResponse.json({
      message: "Activities retrieved successfully",
      data: activities,
    });
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    return NextResponse.json(
      {
        error: "Server Error",
        message: "Failed to fetch activities",
      },
      { status: 500 }
    );
  }
}
