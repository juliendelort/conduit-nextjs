import { ArticlesContainer } from "@/app/_components/articles/ArticlesContainer";
import { z } from "zod";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

export default async function Page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page } = pageSearchParamsSchema.parse(searchParams);
  return (
    <ArticlesContainer
      page={page}
      author={params.username}
    />
  );
}
