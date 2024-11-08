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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to start tracking your daily activities
          </p>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
