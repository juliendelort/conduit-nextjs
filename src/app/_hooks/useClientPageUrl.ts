import { usePathname, useSearchParams } from "next/navigation";

export function useClientPageUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return `${pathname}?${searchParams.toString()}`;
}
