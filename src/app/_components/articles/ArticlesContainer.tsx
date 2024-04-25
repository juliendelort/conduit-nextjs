import { ErrorBoundary } from "@/app/_components/ErrorBoundary";
import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { Suspense } from "react";
import { ArticlesList } from "./ArticlesList";

export interface ArticlesContainerProps {
  page: number;
  tag?: string;
  isFeed?: boolean;
  author?: string;
  favoritedBy?: string;
}

export function ArticlesContainer({
  page,
  tag,
  isFeed,
  author,
  favoritedBy,
}: ArticlesContainerProps) {
  return (
    <ErrorBoundary
      fallback={<ErrorMessage>Error loading articles</ErrorMessage>}
    >
      <Suspense fallback="Loading..." key={`${page}-${tag}`}>
        <ArticlesList
          page={page}
          tag={tag}
          isFeed={!!isFeed}
          author={author}
          favoritedBy={favoritedBy}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
