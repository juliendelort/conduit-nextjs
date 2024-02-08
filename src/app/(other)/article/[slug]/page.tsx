import { fetchArticleAPI } from "@/server/service/articles";

export default async function Page({ params }: { params: { slug: string } }) {
  const { data } = await fetchArticleAPI({ slug: params.slug });
  return (
    <header className="bg-surfaceinverted">
      <h1 className="text-onsurfaceinverted">{data?.article.title}</h1>
    </header>
  );
}
