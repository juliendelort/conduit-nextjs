import clsx from "clsx";
import { useFormStatus } from "react-dom";

export interface SubmitButtonProps {
  text: string;
  isPending: boolean;
}

export function SubmitButton({ text, isPending }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={clsx(
        "ml-auto block rounded bg-brand px-6 py-3 text-right text-xl text-onbrand",
        isPending && "opacity-50",
      )}
      {...(isPending && { "aria-disabled": true })}
    >
      {text}
    </button>
  );
}
