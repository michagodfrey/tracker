// src/app/(protected)/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTodayActivities } from "@/lib/activities";
import { DashboardHeader } from "@/components/dashboard/header";
import { ActivityQuickEntry } from "@/components/dashboard/activity-quick-entry";
import { TodaySummary } from "@/components/dashboard/today-summary";
import { WeeklyOverview } from "@/components/dashboard/weekly-overview";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    // Optionally render a message or redirect to login
    return <p>You need to be logged in to access the dashboard.</p>;
  }

  const activities = await getTodayActivities(session.user.id);

  return (
    <div className="container py-8">
      <DashboardHeader user={session.user} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <div className="lg:col-span-2">
          <ActivityQuickEntry />
        </div>

        <div className="space-y-4">
          <TodaySummary initialActivities={activities} />
        </div>

        <div className="lg:col-span-3">
          <WeeklyOverview userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}
