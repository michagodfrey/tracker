import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { MainNav } from "@/components/nav/main-nav";
import { authOptions } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1">{children}</div>
      <footer className="border-t py-4">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Daily Tracker</p>
          <p className="text-sm text-muted-foreground">Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
