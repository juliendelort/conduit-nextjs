import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";
import { ArticlesList } from "./ArticlesList";
import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { ErrorBoundary } from "@/app/_components/ErrorBoundary";

interface Section {
  title: string;
  href: string;
  isActive: boolean;
}

export interface ArticlesContainerProps {
  sections: Section[];
  page: number;
  tag?: string;
  isFeed?: boolean;
  author?: string;
  favoritedBy?: string;
}

export function ArticlesContainer({
  sections,
  page,
  tag,
  isFeed,
  author,
  favoritedBy,
}: ArticlesContainerProps) {
  const pageUrl = sections.find((s) => s.isActive)?.href ?? "/";
  return (
    <>
      <nav className="mb-4 border-b border-borderprimary">
        <ul className="flex flex-wrap gap-x-2 gap-y-0">
          {sections.map((section) => (
            <li key={section.title}>
              <Link
                className={clsx(
                  "block whitespace-nowrap p-2",
                  section.isActive
                    ? "border-b-2 border-brand text-brand"
                    : "text-onsurfaceprimaryhighest",
                )}
                href={section.href}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ErrorBoundary
        fallback={<ErrorMessage>Error loading articles</ErrorMessage>}
      >
        <Suspense fallback="Loading..." key={`${page}-${tag}`}>
          <ArticlesList
            page={page}
            tag={tag}
            isFeed={!!isFeed}
            pageUrl={pageUrl}
            author={author}
            favoritedBy={favoritedBy}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
