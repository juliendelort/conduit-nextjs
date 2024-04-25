"use client";

import type { FlashType } from "@/server/utils/flash";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export interface ToastOnMountProps {
  text: string;
  type: FlashType;
}

export function ToastOnMount({ text, type }: ToastOnMountProps) {
  const shownOnceRef = useRef(false);
  useEffect(() => {
    if (shownOnceRef.current) {
      return;
    }
    if (!type) {
      toast(text, { duration: 2000 });
    } else {
      toast[type](text, { duration: 2000 });
    }
    shownOnceRef.current = true;
  }, [text, type]);

  return null;
}
