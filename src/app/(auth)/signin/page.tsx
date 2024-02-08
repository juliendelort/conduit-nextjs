import Link from "next/link";
import { SigninForm } from "./SigninForm";
import { z } from "zod";

const pageSearchParamsSchema = z.object({
  redirecturl: z.string().optional(),
});

export default function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { redirecturl } = pageSearchParamsSchema.parse(searchParams);

  return (
    <>
      <h1 className="mb-4 text-4xl">Sign in</h1>
      <Link href="/signup" className="mb-6 block text-brand">
        Need an account?
      </Link>
      <SigninForm redirecturl={redirecturl} />
    </>
  );
}
