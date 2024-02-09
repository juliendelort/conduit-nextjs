"use client";

import { Icon } from "@/app/_components/Icon";
import { toggleFollowUser } from "@/server/actions/profiles";
import clsx from "clsx";
import Link from "next/link";
import { useOptimistic } from "react";
import { toast } from "sonner";

export interface FollowButtonProps {
  isFollowing: boolean;
  username: string;
  isAuthenticated: boolean;
  className?: string;
  activeContainerClassName?: string;
  inactiveContainerClassName?: string;
}

export function FollowButton({
  isFollowing,
  username,
  isAuthenticated,
  className,
  activeContainerClassName,
  inactiveContainerClassName,
}: FollowButtonProps) {
  async function formAction(formData: FormData) {
    toggleFollowLocal(null);

    const result = await toggleFollowUser(formData);
    if (result?.error) {
      toast.error(result.error);
    }
  }
  const [optimisticData, toggleFollowLocal] = useOptimistic(
    {
      isFollowing,
      isOptimistic: false,
    },
    (state) => ({
      ...state,
      isOptimistic: true,
      isFollowing: !state.isFollowing,
    }),
  );

  const content = (
    <>
      <Icon id="plus" className="h-4 w-4" />
      {optimisticData.isFollowing ? "Unfollow" : "Follow"} {username}
    </>
  );

  const containerClassName = clsx(
    "flex items-center rounded border px-2 py-1 text-sm",
    optimisticData.isFollowing
      ? activeContainerClassName
      : inactiveContainerClassName,
  );

  return isAuthenticated ? (
    <form action={formAction} className={className}>
      <input type="hidden" name="username" value={username} />
      <input
        type="hidden"
        name="newFollowValue"
        value={(!optimisticData.isFollowing).toString()}
      />
      <button className={containerClassName}>{content}</button>
    </form>
  ) : (
    <Link href="/signin" className={clsx(containerClassName, className)}>
      {content}
    </Link>
  );
}
