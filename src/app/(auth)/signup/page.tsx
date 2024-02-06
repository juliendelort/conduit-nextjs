import Link from "next/link";
import { AuthPage } from "../AuthPage";
import { SignupForm } from "./SignupForm";

export default function SignUp() {
  return (
    <AuthPage title="Sign up">
      <Link href="/signin" className="mb-6 block text-brand">
        Have an account?
      </Link>
      <SignupForm />
    </AuthPage>
  );
}
