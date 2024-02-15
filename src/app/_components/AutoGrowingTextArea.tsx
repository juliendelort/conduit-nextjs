"use client";

import clsx from "clsx";
import { useState } from "react";
import { inputClasses } from "./Input";

export interface AutoGrowingTextAreaProps
  extends Omit<React.ComponentProps<"textarea">, "className"> {
  containerClassName?: string;
}

// Taken from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
export function AutoGrowingTextArea(props: AutoGrowingTextAreaProps) {
  const [value, setValue] = useState(props.defaultValue ?? props.value);
  const { containerClassName, onChange, ...rest } = props;

  return (
    <div
      className={clsx("grid", containerClassName)}
      data-replicated-value={value}
    >
      <textarea
        {...rest}
        className={clsx(
          inputClasses,
          "col-start-1 col-end-2 row-start-1 row-end-2 resize-none overflow-hidden",
        )}
        onChange={(...args) => {
          const [event] = args;
          setValue(event.target.value);
          if (onChange) {
            onChange(...args);
          }
        }}
      />
      <div
        className={clsx(
          inputClasses,
          "pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 whitespace-pre-wrap",
        )}
        aria-hidden="true"
      >
        {value}{" "}
      </div>
    </div>
  );
}
