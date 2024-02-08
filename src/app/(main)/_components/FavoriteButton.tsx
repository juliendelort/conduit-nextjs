"use client";
import { toggleFavoriteArticle } from "@/server/actions/articles";
import clsx from "clsx";
import Link from "next/link";
import { useOptimistic } from "react";
import { Icon } from "@/app/_components/Icon";
import { toast } from "sonner";

export interface FavoriteButtonProps {
  favoritesCount: number;
  isFavorited: boolean;
  slug: string;
  isAuthenticated: boolean;
}

export function FavoriteButton({
  favoritesCount,
  isFavorited,
  slug,
  isAuthenticated,
}: FavoriteButtonProps) {
  async function formAction(formData: FormData) {
    toggleFavoritedLocal(null);

    const result = await toggleFavoriteArticle(null, formData);
    if (result?.error?.message) {
      toast.error(result.error.message);
    }
  }
  const [favoritedData, toggleFavoritedLocal] = useOptimistic(
    {
      favorited: isFavorited,
      favoritesCount: favoritesCount,
      isOptimistic: false,
    },
    (state) => ({
      ...state,
      isOptimistic: true,
      favorited: !state.favorited,
      favoritesCount: state.favorited
        ? state.favoritesCount - 1
        : state.favoritesCount + 1,
    }),
  );

  const favorited = favoritedData.favorited;
  const count = favoritedData.favoritesCount;

  const containerClassName = clsx(
    "flex items-center gap-1 rounded border border-brand p-1 text-sm",
    favorited ? "bg-brand text-onbrand" : "bg-transparent text-brand",
    favoritedData.isOptimistic && "opacity-50",
  );

  const iconAndCount = (
    <>
      <Icon id="heart" className="h-4 w-4" />
      {count}
    </>
  );

  return isAuthenticated ? (
    <form action={formAction}>
      <input type="hidden" name="slug" value={slug} />
      <input
        type="hidden"
        name="newFavoriteValue"
        value={(!favorited).toString()}
      />
      <button className={containerClassName}>{iconAndCount}</button>
    </form>
  ) : (
    <Link href="/signin" className={containerClassName}>
      {iconAndCount}
    </Link>
  );
}
