import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, {session?.user?.name}
      </h1>
      <p className="text-muted-foreground">
        Start tracking your daily activities
      </p>
    </div>
  );
}
