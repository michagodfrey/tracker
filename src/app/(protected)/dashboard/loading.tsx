// src/app/(protected)/dashboard/loading.tsx
import {
  QuickEntryCardSkeleton,
  TodaySummaryCardSkeleton,
  WeeklyOverviewCardSkeleton,
} from "@/components/dashboard/activity-skeleton";

export default function DashboardLoading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="h-8 w-[200px] animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-[300px] animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-2">
          <QuickEntryCardSkeleton />
        </div>

        <div className="space-y-4">
          <TodaySummaryCardSkeleton />
        </div>

        <div className="lg:col-span-3">
          <WeeklyOverviewCardSkeleton />
        </div>
      </div>
    </div>
  );
}
