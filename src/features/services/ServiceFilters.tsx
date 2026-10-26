import { useTranslate } from "@/i18n/useTranslate";
import { ToggleGroup as Primitive } from "radix-ui";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function ToggleGroup(
  props: Omit<
    Extract<ComponentProps<typeof Primitive.Root>, { type: "single" }>,
    "type"
  >,
) {
  const { dir } = useTranslate();

  return (
    <Primitive.Root
      {...props}
      type="single"
      dir={dir}
      className="flex flex-wrap gap-2"
      onValueChange={(value) => {
        if (value) props.onValueChange?.(value);
      }}
    />
  );
}
export function ToggleGroupItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      {...props}
      className={cn(
        "min-h-12 cursor-pointer border border-border px-4 text-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        className,
      )}
    />
  );
}
