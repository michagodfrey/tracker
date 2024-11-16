import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EntriesFilter } from "@/components/entries/entries-filter";
import { EntriesList } from "@/components/entries/entries-list";
import { EntriesCalendar } from "@/components/entries/entries-calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function EntriesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

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
        <h1 className="text-3xl font-bold tracking-tight">Activity Entries</h1>
        <p className="text-muted-foreground">
          View and manage your activity history
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr] mt-8">
        <div className="space-y-4">
          <EntriesFilter />
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View activities by date</CardDescription>
            </CardHeader>
            <CardContent>
              <EntriesCalendar activities={activities} />
            </CardContent>
          </Card>
        </div>
        <EntriesList activities={activities} />
      </div>
    </div>
  );
}
