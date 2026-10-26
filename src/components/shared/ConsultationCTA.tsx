import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

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
  const { tx } = useTranslate();

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
        <span>{tx(children)}</span>
      </Link>
    </Button>
  );
}
