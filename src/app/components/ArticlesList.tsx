import { listArticlesAPI } from "@/server/service/articles";
import Link from "next/link";

export interface ArticlesListProps {
  page: number;
}

const PAGE_SIZE = 10;

export async function ArticlesList({ page }: ArticlesListProps) {
  const { error, data } = await listArticlesAPI({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });
  return (
    <>
      {data?.articles[0].title}
      <br />
      <Link href={`/?page=${page + 1}`}>Next</Link>
    </>
  );
}
