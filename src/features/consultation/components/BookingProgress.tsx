import { useTranslate } from "@/i18n/useTranslate";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingProgress({ step }: { step: number }) {
  const { tx } = useTranslate();

  return (
    <ol
      className="mb-8 flex justify-between gap-2 border-b border-border pb-6"
      aria-label={tx("خطوات طلب الاستشارة")}
    >
      {["بيانات التواصل", "موضوع الاستشارة", "مراجعة الطلب"].map(
          (label, index) => (
            <li
              key={label}
              aria-current={step === index + 1 ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 text-[10px] md:text-xs",
                step === index + 1
                  ? "font-medium text-forest"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full border border-border",
                  step >= index + 1 && "border-forest bg-forest text-ivory",
                )}
              >
                {tx(
                  step > index + 1 ? <Check className="size-3" /> : index + 1,
                )}
              </span>
              {tx(label)}
            </li>
          ),
        )}
    </ol>
  );
}
