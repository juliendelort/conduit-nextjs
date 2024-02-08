import { z } from "zod";
import {
  ArticlesContainer,
  ArticlesContainerProps,
} from "../ArticlesContainer";
import { useProtectedRoute } from "@/app/_hooks/useProtectedRoute";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  tag: z.string().optional(),
});

export default async function Feed({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await useProtectedRoute("/");
  const { page, tag } = pageSearchParamsSchema.parse(searchParams);

  const props: ArticlesContainerProps = tag
    ? {
        tag,
        activeSection: "tag",
        includeFeed: true,
        page,
      }
    : {
        activeSection: "feed",
        includeFeed: true,
        page,
        tag: undefined,
      };

  return <ArticlesContainer {...props} />;
}
