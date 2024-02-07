import { listTagsAPI } from "@/server/service/tags";
import Link from "next/link";

export async function TagsList() {
  const { error, data } = await listTagsAPI();
  return (
    <ul className="flex flex-wrap gap-1">
      {data?.tags?.map((t) => (
        <li key={t}>
          <Link
            className="bg-neutral text-onneutral  block rounded-2xl  px-2 py-1 text-sm"
            href={`/?tag=${t}`}
          >
            {t}
          </Link>
        </li>
      ))}
    </ul>
  );
}
