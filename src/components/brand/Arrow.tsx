import { ArrowUpLeft } from "lucide-react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpLeft
      size={20}
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
    />
  );
}
