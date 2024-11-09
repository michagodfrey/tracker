// src/components/dashboard/header.tsx
import { User } from "next-auth";
import { WelcomeMessage } from "./welcome-message";

interface DashboardHeaderProps {
  user: User | null | undefined;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <WelcomeMessage name={user?.name} />
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <p className="text-muted-foreground">Record and track your activities</p>
        </div>
      </div>
    </div>
  );
}