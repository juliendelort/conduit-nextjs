import { useProtectedRoute } from "@/app/_hooks/useProtectedRoute";
import { z } from "zod";
import {
  ArticlesContainer,
  ArticlesContainerProps,
} from "../../_components/articles/ArticlesContainer";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

export default async function Feed({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await useProtectedRoute("/");
  const { page } = pageSearchParamsSchema.parse(searchParams);

  const props: ArticlesContainerProps = {
    isFeed: true,
    page
  };

  return <ArticlesContainer {...props} />;
}
