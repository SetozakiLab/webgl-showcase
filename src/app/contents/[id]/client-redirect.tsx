"use client";
import { useEffect } from "react";

export function ClientRedirect({
  to,
  delayMs = 800,
}: {
  to: string;
  delayMs?: number;
}) {
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        window.location.replace(to);
      } catch {
        // ignore
      }
    }, delayMs);
    return () => clearTimeout(id);
  }, [to, delayMs]);
  return null;
}
