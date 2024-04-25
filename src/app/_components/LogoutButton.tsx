"use client";

import { signoutAction } from "@/server/actions/auth";
import { useTransition } from "react";
import { toast } from "sonner";
import { classMerge } from '../classMerge';
import { Icon } from "./Icon";

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
      className={classMerge("flex", isPending && "opacity-50")}
      {...(isPending && { "aria-disabled": true })}
      title="Logout"
    >
      <Icon id="logout" className="h-5 w-5 text-inherit" />
    </button>
  );
}
