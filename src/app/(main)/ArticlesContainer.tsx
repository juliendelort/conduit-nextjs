import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";
import { ArticlesList } from "../_components/ArticlesList";

type ActiveSectionFeedOrGlobal = {
  activeSection: "feed" | "global";
  tag: undefined;
};

type ActiveSectionTag = {
  activeSection: "tag";
  tag: string;
};

export type ArticlesContainerProps = {
  includeFeed: boolean;
  page: number;
} & (ActiveSectionFeedOrGlobal | ActiveSectionTag);

export function ArticlesContainer({
  includeFeed,
  activeSection,
  page,
  tag,
}: ArticlesContainerProps) {
  return (
    <>
      <nav className="mb-4 border-b">
        <ul className="flex gap-4">
          {includeFeed && (
            <li>
              <Link
                className={clsx(
                  "block p-2",
                  activeSection === "feed"
                    ? "border-b-2 border-brand text-brand"
                    : "text-gray-500",
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
                  : "text-gray-500",
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
          ) : null}
        </ul>
      </nav>
      <Suspense fallback="Loading..." key={`${page}-${tag}`}>
        <ArticlesList page={page} tag={tag} />
      </Suspense>
    </>
  );
}
