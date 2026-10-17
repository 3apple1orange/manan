"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "dark" | "light";
}

/** Copies text to the clipboard and confirms for two seconds. */
export default function CopyButton({ text, label = "Copy citation", variant = "dark" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked in some browsers; fail quietly.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-500",
        variant === "dark"
          ? "border-ink/30 text-ink hover:border-ink"
          : "border-paper/40 text-paper hover:bg-paper hover:text-ink"
      )}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}