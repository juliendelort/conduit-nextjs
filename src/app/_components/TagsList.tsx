import { listTagsAPI } from "@/server/service/tags";
import Link from "next/link";

export async function TagsList() {
  const { error, data } = await listTagsAPI();
  return (
    <ul className="flex flex-wrap gap-1">
      {data?.tags?.map((t) => (
        <li key={t}>
          <Link
            className="block rounded-2xl  bg-gray-500 px-2  py-1 text-sm text-white"
            href={`/?tag=${t}`}
          >
            {t}
          </Link>
        </li>
      ))}
    </ul>
  );
}
