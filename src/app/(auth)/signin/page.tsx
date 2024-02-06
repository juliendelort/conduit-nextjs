import Link from "next/link";
import { SigninForm } from "./SigninForm";
import { AuthPage } from "../AuthPage";

export default function SignIn() {
  return (
    <AuthPage title="Sign in">
      <Link href="/signup" className="mb-6 block text-brand">
        Need an account?
      </Link>
      <SigninForm />
    </AuthPage>
  );
}
