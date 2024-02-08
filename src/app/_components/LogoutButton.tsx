"use client";

import { signoutAction } from "@/server/actions/auth";
import { useTransition } from "react";
import { toast } from "sonner";
import { Icon } from "./Icon";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      onClick={async () => {
        startTransition(async () => {
          const result = await signoutAction();

          if (result.error.message) {
            toast.error(result.error.message);
          }
        });
      }}
      aria-label="Logout"
    >
      <Icon id="logout" className="h-5 w-5 text-inherit" />
    </button>
  );
}
