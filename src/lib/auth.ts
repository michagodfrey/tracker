import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getRequiredSession() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return session;
}
