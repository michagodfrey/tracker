// src/app/(protected)/dashboard/page.tsx
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTodayActivities } from "@/lib/activities";
import { DashboardHeader } from "@/components/dashboard/header";
import { ActivityQuickEntry } from "@/components/dashboard/activity-quick-entry";
import { TodaySummary } from "@/components/dashboard/today-summary";
import { WeeklyOverview } from "@/components/dashboard/weekly-overview";
import {
  QuickEntryCardSkeleton,
  TodaySummaryCardSkeleton,
  WeeklyOverviewCardSkeleton,
} from "@/components/dashboard/activity-skeleton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return (
    <div className="container py-8">
      <DashboardHeader user={session?.user} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<QuickEntryCardSkeleton />}>
            <ActivityQuickEntry />
          </Suspense>
        </div>

        <div className="space-y-4">
          <Suspense fallback={<TodaySummaryCardSkeleton />}>
            <TodaySummaryContent userId={session.user.id} />
          </Suspense>
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<WeeklyOverviewCardSkeleton />}>
            <WeeklyOverview userId={session.user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function TodaySummaryContent({ userId }: { userId: string }) {
  const activities = await getTodayActivities(userId);
  return <TodaySummary initialActivities={activities} />;
}
