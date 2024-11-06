import Link from "next/link";
import { SignInButton } from "../auth/signin-button";

export function MainNav() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold">
          Tracker
        </Link>

        <nav className="ml-auto flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/entries"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Entries
          </Link>
          <SignInButton />
        </nav>
      </div>
    </header>
  );
}
