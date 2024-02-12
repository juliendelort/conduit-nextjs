import { useProtectedRoute } from "@/app/_hooks/useProtectedRoute";
import { CreateArticleForm } from "./CreateArticleForm";

export default async function Page() {
  await useProtectedRoute("/article/new");
  return (
    <main className="container mx-auto mt-8 max-w-5xl">
      <CreateArticleForm />
    </main>
  );
}
