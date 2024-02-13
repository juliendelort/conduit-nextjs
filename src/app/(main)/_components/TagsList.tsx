import { DBListTags } from "@/server/data/tags";
import Link from "next/link";

export async function TagsList() {
  const tags = await DBListTags();
  return (
    <ul className="flex flex-wrap gap-1">
      {tags?.map((t) => (
        <li key={t.name}>
          <Link
            className="block rounded-2xl  bg-surfacetertiary px-2  py-1 text-sm text-onsurfacetertiary"
            href={`/?tag=${t.name}`}
          >
            {t.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
