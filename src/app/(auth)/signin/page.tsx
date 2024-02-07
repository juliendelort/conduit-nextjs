import Link from "next/link";
import { SigninForm } from "./SigninForm";

export default function SignIn() {
  return (
    <>
      <h1 className="mb-4 text-4xl">Sign in</h1>
      <Link href="/signup" className="mb-6 block text-brand">
        Need an account?
      </Link>
      <SigninForm />
    </>
  );
}
