import { useProtectedRoute } from "@/app/_hooks/useProtectedRoute";
import { EditProfileForm } from "./EditProfileForm";
import { fetchProfileAPI } from "@/server/service/profiles";
import { cookies } from "next/headers";
import { getSession } from "@/server/utils/session";

export default async function Page() {
  await useProtectedRoute("/settings");

  const session = await getSession(cookies());
  return (
    <>
      <h1 className="mt-4 text-center text-3xl">Your Settings</h1>
      <main className="mx-auto mt-8 max-w-5xl">
        <EditProfileForm
          profile={{
            username: session.username,
            email: session.email,
            bio: session.bio,
            image: session.image,
          }}
        />
      </main>
    </>
  );
}
