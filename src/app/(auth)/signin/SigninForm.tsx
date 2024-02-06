"use client";

import { loginAction } from "@/server/actions/auth";
import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../SubmitButton";
import { Input } from "@/app/_components/Input";
import { ErrorMessage } from "../../_components/FormError";

export function SigninForm() {
  const [formEdited, setFormEdited] = useState(false);
  const [state, loginActionWithState] = useFormState(loginAction, {
    error: "",
  });

  // After getting an error, hide the error as soon as the user types
  const handleChange = () => {
    setFormEdited(true);
  };
  const handleSubmit = () => {
    setFormEdited(false);
  };
  return (
    <form
      action={loginActionWithState}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <div className="mx-auto w-full max-w-xl">
        <div role="alert">
          {state.error && !formEdited ? (
            <ErrorMessage className="my-4">Error: {state.error}</ErrorMessage>
          ) : null}
        </div>
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
