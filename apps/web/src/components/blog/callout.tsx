import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { Callout } from "@repo/sanity-schema";

const TONE_CONFIG = {
  note: {
    icon: Info,
    border: "border-outline-variant",
    bg: "bg-surface-container-low",
    iconColor: "text-muted-foreground",
  },
  tip: {
    icon: Lightbulb,
    border: "border-brand/30",
    bg: "bg-brand-container",
    iconColor: "text-brand-strong",
  },
  warning: {
    icon: TriangleAlert,
    border: "border-destructive/30",
    bg: "bg-destructive-container",
    iconColor: "text-destructive",
  },
} as const;

export function Callout({ value }: { value: Callout }) {
  const config = TONE_CONFIG[value.tone] ?? TONE_CONFIG.note;
  const Icon = config.icon;

  return (
    <div
      className={`not-prose my-8 flex gap-3 rounded-lg border ${config.border} ${config.bg} p-5`}
    >
      <Icon size={20} className={`mt-0.5 shrink-0 ${config.iconColor}`} />
      <p className="text-body-md text-foreground">{value.text}</p>
    </div>
  );
}
