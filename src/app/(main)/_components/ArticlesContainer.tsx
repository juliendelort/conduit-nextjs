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
  return (
    <>
      <nav className="mb-4 border-b border-borderprimary">
        <ul className="flex gap-4">
          {sections.map((section) => (
            <li key={section.title}>
              <Link
                className={clsx(
                  "block p-2",
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
          {/* {includeFeed && (
            <li>
              <Link
                className={clsx(
                  "block p-2",
                  activeSection === "feed"
                    ? "border-b-2 border-brand text-brand"
                    : "text-onsurfaceprimaryhighest",
                )}
                href="/feed"
              >
                Your Feed
              </Link>
            </li>
          )}
          <li>
            <Link
              className={clsx(
                "block p-2",
                activeSection === "global"
                  ? "border-b-2 border-brand text-brand"
                  : "text-onsurfaceprimaryhighest",
              )}
              href="/"
            >
              Global Feed
            </Link>
          </li>
          {tag ? (
            <li>
              <Link
                className="block border-b-2 border-brand p-2 text-brand"
                href="/"
              >
                #{tag}
              </Link>
            </li>
          ) : null} */}
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
            pageUrl={`/${isFeed ? "feed" : ""}?${tag ? `&tag=${tag}` : ""}`}
            author={author}
            favoritedBy={favoritedBy}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
