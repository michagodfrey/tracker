import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { QuickEntryForm } from "@/components/entry/quick-entry-form";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name}
        </h1>
        <p className="text-gray-500">Track and monitor your daily activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Entry</CardTitle>
            <CardDescription>Record a new activity</CardDescription>
          </CardHeader>
          <CardContent>
            <QuickEntryForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Todays Summary</CardTitle>
            <CardDescription>Overview of your day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Meals logged</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Exercise minutes</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Wake up time</span>
                <span className="font-medium">Not logged</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Stats</CardTitle>
            <CardDescription>Your past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Stats coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
