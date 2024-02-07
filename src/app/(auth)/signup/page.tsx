import Link from "next/link";
import { SignupForm } from "./SignupForm";

export default function SignUp() {
  return (
    <>
      <h1 className="mb-4 text-4xl">Sign up</h1>
      <Link href="/signin" className="mb-6 block text-brand">
        Have an account?
      </Link>
      <SignupForm />
    </>
  );
}
