import { useServerPageUrl } from "@/app/_hooks/useServerPageUrl";
import clsx from "clsx";
import Link from "next/link";

export interface PagesProps {
  pagesCount: number;
  currentPage: number;
}

export function Pages({ currentPage, pagesCount }: PagesProps) {
  const currentURL = useServerPageUrl();
  const getPageUrl = (page: number) => {
    const url = new URL(currentURL);
    url.searchParams.set("page", String(page));
    return decodeURIComponent(url.toString());
  };
  return (
    <nav>
      <ul className="flex flex-wrap gap-y-2">
        {new Array(pagesCount).fill(0).map((p, index) => {
          const page = index + 1;
          return (
            <li className="group" key={`page-${page}`}>
              <Link
                href={getPageUrl(page)}
                className={clsx(
                  "block border-y border-l border-borderprimary px-3 py-2 hover:bg-surfacehover group-first-of-type:rounded-s group-last-of-type:rounded-r group-last-of-type:border-r",
                  currentPage === page ? "bg-brand text-onbrand" : "text-brand",
                )}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
