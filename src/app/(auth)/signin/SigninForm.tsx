"use client";

import { loginAction } from "@/server/actions/auth";
import { useEffect, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../_components/SubmitButton";
import { Input } from "@/app/_components/Input";
import { ErrorMessage } from "../../_components/ErrorMessage";
import { toast } from "sonner";

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
      toast.error("You must login first!");
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
        <Input
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Email"
          required
          className="mb-4"
          autoComplete="username"
        />
        <Input
          type="password"
          name="password"
          aria-label="Password"
          placeholder="Password"
          required
          className="mb-4"
          autoComplete="current-password"
        />
        <SubmitButton text="Sign in" isPending={isPending} />
      </div>
    </form>
  );
}
