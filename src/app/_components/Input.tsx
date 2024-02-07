import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={clsx(
        "fix-autofill", // Defined in globals.css
        "bg-surfacesecondary border-borderprimary text-onsurfacesecondary autofill:text-onsurfacesecondary block w-full rounded border px-4 py-2 text-xl",
        className,
      )}
    />
  );
}
