"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

export interface ToastOnMountProps {
  text: string;
}

export function ToastOnMount({ text }: ToastOnMountProps) {
  const shownOnceRef = useRef(false);
  useEffect(() => {
    if (shownOnceRef.current) {
      return;
    }
    toast(text, { duration: 2000 });
    shownOnceRef.current = true;
  }, [text]);

  return null;
}
