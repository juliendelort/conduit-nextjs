import clsx from "clsx";
import Link from "next/link";

export interface PagesProps {
  pagesCount: number;
  currentPage: number;
  currentTag?: string;
}

export function Pages({ currentPage, pagesCount, currentTag }: PagesProps) {
  return (
    <nav>
      <ul className="flex flex-wrap gap-y-2">
        {new Array(pagesCount).fill(0).map((p, index) => {
          const page = index + 1;
          return (
            <li className="group" key={`page-${page}`}>
              <Link
                href={`/?page=${page}${currentTag ? `&tag=${currentTag}` : ""}`}
                className={clsx(
                  "block border-y border-l px-3 py-2 hover:bg-gray-100 group-first-of-type:rounded-s group-last-of-type:rounded-r group-last-of-type:border-r",
                  currentPage === page ? "bg-brand text-white" : "text-brand",
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
