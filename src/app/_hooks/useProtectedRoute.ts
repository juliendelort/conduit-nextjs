import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function useProtectedRoute(redirectUrl?: string) {
  const session = await getSession(cookies());

  if (!session.user) {
    redirect(`/signin${redirectUrl ? `?redirecturl=${redirectUrl}` : ""}`);
  }

  return session.user;
}
