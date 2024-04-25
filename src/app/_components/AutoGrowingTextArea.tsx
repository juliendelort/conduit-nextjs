"use client";

import { useState } from "react";
import { classMerge } from '../classMerge';

export interface AutoGrowingTextAreaProps
  extends Omit<React.ComponentProps<"textarea">, "className"> {
  containerClassName?: string;
  inputClassName?: string;
}

// Taken from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
export function AutoGrowingTextArea(props: AutoGrowingTextAreaProps) {
  const [value, setValue] = useState(props.defaultValue ?? props.value);
  const { containerClassName, inputClassName, onChange, ...rest } = props;

  return (
    <div
      className={classMerge("grid", containerClassName)}
      data-replicated-value={value}
    >
      <textarea
        {...rest}
        className={classMerge(
          inputClassName,
          "col-start-1 col-end-2 row-start-1 row-end-2 resize-none overflow-hidden whitespace-break-spaces break-all",
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
        className={classMerge(
          inputClassName,
          "pointer-events-none invisible col-start-1 col-end-2 row-start-1 row-end-2 whitespace-break-spaces break-all",
        )}
        aria-hidden="true"
      >
        {value}{" "}
      </div>
    </div>
  );
}
