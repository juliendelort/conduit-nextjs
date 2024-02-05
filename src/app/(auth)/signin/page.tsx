"use client";

import { loginAction as login } from "@/server/actions/auth";
import { useFormState } from "react-dom";

export default function SignIn() {
  const [state, loginAction] = useFormState(login, { message: "" });

  return (
    <>
      <h1>Sign In</h1>
      {state.message ? <div>Error: {state.message}</div> : null}
      <form action={loginAction}>
        <input type="text" name="email" className="border" />
        <input type="password" name="password" className="border" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
