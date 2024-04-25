import type { SafeUser } from "./auth";

export interface Article {
  id: number;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Pick<SafeUser, "id" | "username" | "bio" | "image"> & {
    following: boolean;
  };
}
