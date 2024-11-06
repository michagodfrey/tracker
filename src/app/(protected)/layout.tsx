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
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
