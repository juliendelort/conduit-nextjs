import clsx from "clsx";
import { useFormStatus } from "react-dom";

export interface SubmitButtonProps {
  text: string;
}

export function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        "ml-auto block rounded bg-brand px-6 py-3 text-right text-xl text-white",
        pending && "pointer-events-none opacity-50",
      )}
    >
      {pending ? "Submitting..." : text}
    </button>
  );
}
