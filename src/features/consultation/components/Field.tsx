import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium leading-6">
        {label}
        {required ? (
          " *"
        ) : (
          <span className="text-xs text-muted-foreground">اختياري</span>
        )}
      </Label>
      {children}
      {error && (
        <p id={id + "-error"} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
