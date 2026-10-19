import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function FieldGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-5", className)}>{children}</div>;
}

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
    <div className="flex flex-col gap-2" data-invalid={!!error || undefined}>
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
