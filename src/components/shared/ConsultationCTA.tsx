import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";
export function CTA({
  children = "احجز استشارة",
  to = "/consultation",
  secondary = false,
  light = false,
  className = "",
  ...linkProps
}: Omit<ComponentProps<typeof Link>, "to" | "children" | "className"> & {
  children?: ReactNode;
  to?: string;
  secondary?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant={secondary ? "outline" : "default"}
      className={cn(
        "consultation-cta group h-[54px] justify-center rounded-xs px-6 text-[15px] hover:-translate-y-0.5",
        light && "bg-ivory text-forest hover:bg-ivory/90",
        className,
      )}
    >
      <Link {...linkProps} to={to}>
        <span>{children}</span>
      </Link>
    </Button>
  );
}
