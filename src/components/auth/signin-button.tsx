"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-700">{session.user.name}</p>
        <Button variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="default" onClick={() => signIn("github")}>
      Sign In with GitHub
    </Button>
  );
}
