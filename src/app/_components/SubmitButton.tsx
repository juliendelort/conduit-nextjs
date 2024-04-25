import clsx from "clsx";

export interface SubmitButtonProps {
  text: string;
  isPending: boolean;
}

export function SubmitButton({ text, isPending }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={clsx(
        "hover:bg-brandhover ml-auto block rounded bg-brand px-6 py-3 text-right text-xl text-onbrand transition-colors",
        isPending && "opacity-50",
      )}
      {...(isPending && { "aria-disabled": true })}
    >
      {text}
    </button>
  );
}
