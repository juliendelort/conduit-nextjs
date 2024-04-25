"use client";

import { inputClasses } from "@/app/_components/Input";
import { classMerge } from '@/app/classMerge';
import { signupAction } from "@/server/actions/auth";
import { useState, useTransition } from "react";
import { ErrorMessage } from "../../_components/ErrorMessage";
import { SubmitButton } from "../../_components/SubmitButton";

export interface SignupFormProps {}

export function SignupForm({}: SignupFormProps) {
  const [submitError, setSubmitError] = useState("");
  const [isPending, startTransition] = useTransition();

  const action = async (formData: FormData) => {
    if (isPending) {
      return;
    }
    const password = formData.get("password") as string;
    const repeat_password = formData.get("repeat_password") as string;

    if (repeat_password !== password) {
      setSubmitError("Passwords do not match");
      return;
    }
    startTransition(async () => {
      const result = await signupAction(formData);

      if (result.error) {
        setSubmitError(result.error);
      }
    });
  };

  // clear errors as soon as the user types
  const handleChange = () => {
    setSubmitError("");
  };

  return (
    <form action={action} onChange={handleChange}>
      <div className="mx-auto w-full max-w-xl">
        <div role="alert">
          {submitError ? (
            <ErrorMessage className="my-4">Error: {submitError}</ErrorMessage>
          ) : null}
        </div>
        <input
          type="text"
          name="username"
          aria-label="Username"
          placeholder="Username"
          required
          minLength={3}
          className={classMerge(inputClasses, "mb-4")}
        />
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
          minLength={8}
          className={classMerge(inputClasses, "mb-4")}
          autoComplete="new-password"
        />
        <input
          type="password"
          name="repeat_password"
          aria-label="Repeat Password"
          placeholder="Repeat Password"
          required
          minLength={8}
          className={classMerge(inputClasses, "mb-4")}
          autoComplete="new-password"
        />
        <SubmitButton text="Sign up" isPending={isPending} />
      </div>
    </form>
  );
}
