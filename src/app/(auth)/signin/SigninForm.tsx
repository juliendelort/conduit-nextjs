"use client";

import { inputClasses } from "@/app/_components/Input";
import { classMerge } from '@/app/classMerge';
import { loginAction } from "@/server/actions/auth";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { ErrorMessage } from "../../_components/ErrorMessage";
import { SubmitButton } from "../../_components/SubmitButton";

export interface SigninFormProps {
  redirecturl?: string;
}
export function SigninForm({ redirecturl }: SigninFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const formAction = async (formData: FormData) => {
    if (isPending) {
      return;
    }
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.error) {
        setError(result.error);
      }
    });
  };

  // After getting an error, hide the error as soon as the user types
  const handleChange = () => {
    setError(null);
  };

  const showToast = !!redirecturl;

  useEffect(() => {
    if (showToast) {
      toast.info("You must login first!");
    }
  }, [showToast]);
  return (
    <form action={formAction} onChange={handleChange}>
      <div className="mx-auto w-full max-w-xl">
        <div role="alert">
          {error ? <ErrorMessage className="my-4">{error}</ErrorMessage> : null}
        </div>
        {!!redirecturl && (
          <input type="hidden" value={redirecturl} name="redirecturl" />
        )}
        <input
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Email"
          required
          className={classMerge(inputClasses, "mb-4")}
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          aria-label="Password"
          placeholder="Password"
          required
          className={classMerge(inputClasses, "mb-4")}
          autoComplete="current-password"
        />
        <SubmitButton text="Sign in" isPending={isPending} />
      </div>
    </form>
  );
}
