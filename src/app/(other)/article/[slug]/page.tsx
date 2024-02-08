import { fetchArticleAPI } from "@/server/service/articles";

export default async function Page({ params }: { params: { slug: string } }) {
  const { article } = await fetchArticleAPI({ slug: params.slug });
  return (
    <header className="bg-surfaceinverted">
      <h1 className="text-onsurfaceinverted">{article.title}</h1>
    </header>
  );
}
