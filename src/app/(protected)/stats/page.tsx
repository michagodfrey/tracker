import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ActivityOverview,
  ExerciseStats,
  MealPatterns,
  WakeUpAnalysis,
} from "@/components/stats";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function StatsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  // Fetch all user activities for statistics
  const activities = await prisma.activity.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Activity Statistics
        </h1>
        <p className="text-muted-foreground">
          Analyze your activity patterns and trends
        </p>
      </div>

      <div className="grid gap-6 mt-8">
        {/* Activity Overview Section */}
        <Suspense fallback={<StatsCardSkeleton />}>
          <ActivityOverview activities={activities} />
        </Suspense>

        {/* Exercise Statistics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Suspense fallback={<StatsCardSkeleton />}>
            <ExerciseStats activities={activities} />
          </Suspense>

          {/* Meal Patterns */}
          <Suspense fallback={<StatsCardSkeleton />}>
            <MealPatterns activities={activities} />
          </Suspense>
        </div>

        {/* Wake-up Time Analysis */}
        <Suspense fallback={<StatsCardSkeleton />}>
          <WakeUpAnalysis activities={activities} />
        </Suspense>
      </div>
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  );
}
