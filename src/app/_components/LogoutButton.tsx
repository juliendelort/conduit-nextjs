"use client";

import { signoutAction } from "@/server/actions/auth";
import { useTransition } from "react";
import { toast } from "sonner";
import { Icon } from "./Icon";
import clsx from "clsx";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      onClick={async () => {
        if (isPending) return;
        startTransition(async () => {
          const result = await signoutAction();

          if (result.error) {
            toast.error(result.error);
          }
        });
      }}
      aria-label="Logout"
      className={clsx(isPending && "opacity-50")}
      {...(isPending && { "aria-disabled": true })}
    >
      <Icon id="logout" className="h-5 w-5 text-inherit" />
    </button>
  );
}
