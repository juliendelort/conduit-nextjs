import { useProtectedRoute } from "@/app/_hooks/useProtectedRoute";
import { EditProfileForm } from "./EditProfileForm";

export default async function Page() {
  const user = await useProtectedRoute("/settings");
  return (
    <>
      <h1 className="mt-4 text-center text-3xl">Your Settings</h1>
      <main className="container mx-auto mt-8 max-w-5xl">
        <EditProfileForm profile={user} />
      </main>
    </>
  );
}
