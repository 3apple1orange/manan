import { Award } from "lucide-react";
import { researchEndorsement as e } from "@/lib/site-config";

export default function EndorsementNote() {
  return (
    <div
      className="mt-5 flex items-center gap-4 rounded-2xl px-4 py-3.5 text-paper"
      style={{ backgroundColor: e.tone }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
        style={{ borderColor: "rgba(216, 194, 143, 0.5)", color: "#d8c28f" }}
      >
        <Award className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.22em] text-paper/60">Endorsed</span>
        <span className="block text-sm leading-snug">
          {e.name}, {e.role}, {e.institution}
        </span>
      </span>
    </div>
  );
}