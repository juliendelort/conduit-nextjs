import { classMerge } from '../classMerge';

export const inputClasses = classMerge(
  "fix-autofill", // Defined in globals.css
  "block w-full rounded border border-borderprimary bg-surfaceprimary px-4 py-2 text-xl text-onsurfaceprimary autofill:text-onsurfaceprimary",
);
