// src/components/auth/signin-button.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function SignInButton() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      const result = await signIn("github", { callbackUrl: "/dashboard" });
      if (!result?.ok) {
        toast({
          title: "Authentication failed",
          description: "Unable to sign in with GitHub. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/signin" });
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-700">{session.user.name}</p>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="default" onClick={handleSignIn}>
      Sign In with GitHub
    </Button>
  );
}
