"use client";

import { loginAction as login } from "@/server/actions/auth";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function SignIn() {
  const [formEdited, setFormEdited] = useState(false);
  const [state, loginAction] = useFormState(login, { message: "" });

  // After getting an error, hide the error as soon as the user types
  const handleChange = () => {
    setFormEdited(true);
  };
  const handleSubmit = () => {
    setFormEdited(false);
  };
  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl">Sign in</h1>
      <Link href="/signup" className="text-brand mb-6 block">
        Need an account?
      </Link>
      <form
        action={loginAction}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-full max-w-xl ">
          <div role="alert">
            {state.message && !formEdited ? (
              <div className="my-4 rounded text-red-500">
                Error: {state.message}
              </div>
            ) : null}
          </div>
          <input
            type="email"
            name="email"
            aria-label="Email"
            placeholder="Email"
            required
            className="autofill:text-red mb-4 block w-full rounded border px-4 py-2 text-xl"
          />
          <input
            type="password"
            name="password"
            aria-label="Password"
            placeholder="Password"
            required
            className="mb-4 block w-full rounded border px-4 py-2 text-xl"
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        "bg-brand ml-auto block rounded px-6 py-3 text-right text-xl text-white",
        pending && "pointer-events-none opacity-50",
      )}
    >
      {pending ? "Submitting..." : "Login"}
    </button>
  );
};
