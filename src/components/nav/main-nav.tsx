import Link from "next/link";
import { SignInButton } from "../auth/signin-button";

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Daily Tracker
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground/80"
            >
              Dashboard
            </Link>
            <Link
              href="/entries"
              className="transition-colors hover:text-foreground/80"
            >
              Entries
            </Link>
            <Link
              href="/stats"
              className="transition-colors hover:text-foreground/80"
            >
              Statistics
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search later if needed */}
          </div>
          <nav className="flex items-center">
            <SignInButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
