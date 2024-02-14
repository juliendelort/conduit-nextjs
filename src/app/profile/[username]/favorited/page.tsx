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
      favoritedBy={params.username}
      sections={[
        {
          title: "My Articles",
          href: `/profile/${params.username}`,
          isActive: false,
        },
        {
          title: "Favorited Articles",
          href: `/profile/${params.username}/favorited`,
          isActive: true,
        },
      ]}
    />
  );
}
