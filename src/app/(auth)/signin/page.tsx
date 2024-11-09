// src/app/(auth)/signin/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { SignInButton } from "@/components/auth/signin-button";
import { authOptions } from "@/lib/auth";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Daily Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to start tracking your activities
          </p>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
