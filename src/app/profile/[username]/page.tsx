import { ArticlesContainer } from "@/app/(main)/_components/ArticlesContainer";
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
      sections={[
        {
          title: "My Articles",
          href: `/profile/${params.username}`,
          isActive: true,
        },
        {
          title: "Favorited Articles",
          href: `/profile/${params.username}/favorited`,
          isActive: false,
        },
      ]}
    />
  );
}
