"use client";
import { Icon } from "@/app/_components/Icon";
import { useClientPageUrl } from "@/app/_hooks/useClientPageUrl";
import { classMerge } from '@/app/classMerge';
import { toggleFavoriteArticle } from "@/server/actions/articles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import { toast } from "sonner";

export interface FavoriteButtonProps {
  favoritesCount: number;
  isFavorited: boolean;
  id: number;
  isAuthenticated: boolean;
  text: string;
}

export function FavoriteButton({
  favoritesCount,
  isFavorited,
  id,
  isAuthenticated,
  text,
}: FavoriteButtonProps) {
  const currentUrl = useClientPageUrl();
  const router = useRouter();
  async function formAction(formData: FormData) {
    toggleFavoritedLocal(null);

    const result = await toggleFavoriteArticle(formData);
    if (result?.error) {
      toast.error(result.error);
    }

    router.refresh();
  }
  const [optimisticData, toggleFavoritedLocal] = useOptimistic(
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

  const favorited = optimisticData.favorited;
  const count = optimisticData.favoritesCount;

  const containerClassName = classMerge(
    "flex items-center gap-1 rounded border border-brand p-1 text-sm",
    favorited
      ? "bg-brand text-onbrand hover:bg-transparent hover:text-brand"
      : "bg-transparent text-brand hover:bg-brand hover:text-onbrand",
    optimisticData.isOptimistic && "opacity-50",
  );

  const content = (
    <>
      <Icon id="heart" className="h-4 w-4" />
      {text.replaceAll(/{count}/g, count.toString())}
    </>
  );

  return isAuthenticated ? (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input
        type="hidden"
        name="newFavoriteValue"
        value={(!favorited).toString()}
      />
      <button className={containerClassName}>{content}</button>
    </form>
  ) : (
    <Link
      href={`/signin?redirecturl=${encodeURIComponent(currentUrl)}`}
      className={containerClassName}
    >
      {content}
    </Link>
  );
}
