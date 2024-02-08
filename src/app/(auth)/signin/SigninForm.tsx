"use client";

import { loginAction } from "@/server/actions/auth";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../SubmitButton";
import { Input } from "@/app/_components/Input";
import { ErrorMessage } from "../../_components/FormError";
import { toast } from "sonner";

export interface SigninFormProps {
  redirecturl?: string;
}
export function SigninForm({ redirecturl }: SigninFormProps) {
  const [formEdited, setFormEdited] = useState(false);
  const [state, loginActionWithState] = useFormState(loginAction, {
    error: { message: "" },
  });

  // After getting an error, hide the error as soon as the user types
  const handleChange = () => {
    setFormEdited(true);
  };
  const handleSubmit = () => {
    setFormEdited(false);
  };

  const showToast = !!redirecturl;

  useEffect(() => {
    if (showToast) {
      toast.error("You must login first!");
    }
  }, [showToast]);
  return (
    <form
      action={loginActionWithState}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <div className="mx-auto w-full max-w-xl">
        <div role="alert">
          {state.error.message && !formEdited ? (
            <ErrorMessage className="my-4">
              Error: {state.error.message}
            </ErrorMessage>
          ) : null}
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
        <SubmitButton text="Sign in" />
      </div>
    </form>
  );
}
