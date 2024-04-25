// eslint-disable-next-line no-restricted-imports
import clsx from 'clsx';
// eslint-disable-next-line no-restricted-imports
import { twMerge } from 'tailwind-merge';

export function classMerge(...args: Parameters<typeof clsx>) {
  return twMerge(clsx(args));
}
