import { cookies } from "next/headers";
import { getSession } from "@/server/utils/session";
import { z } from "zod";
import {
  ArticlesContainer,
  ArticlesContainerProps,
} from "./_components/ArticlesContainer";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  tag: z.string().optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession(cookies());
  const { page, tag } = pageSearchParamsSchema.parse(searchParams);

  const props: ArticlesContainerProps = tag
    ? {
        tag,
        activeSection: "tag",
        includeFeed: !!session.isAuthenticated,
        page,
      }
    : {
        activeSection: "global",
        includeFeed: !!session.isAuthenticated,
        page,
        tag: undefined,
      };

  return <ArticlesContainer {...props} />;
}
