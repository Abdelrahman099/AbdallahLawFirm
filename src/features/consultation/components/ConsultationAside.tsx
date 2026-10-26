import { useTranslate } from "@/i18n/useTranslate";
import { CalendarDays, LockKeyhole } from "lucide-react";

export function ConsultationAside() {
  const { tx } = useTranslate();

  return (
    <aside className="space-y-6 bg-muted p-7 lg:sticky lg:top-6">
      <img src="/brand/v4/mark-primary.svg" alt="" width="72" height="61" />
      <p className="text-xs text-muted-foreground">{tx("خطوة أولى، بوضوح")}</p>
      <h2 className="text-[29px] leading-relaxed">
        {tx("الموضوع يهمك.")}
        <br />
        {tx("والتفاصيل تهمّنا.")}
      </h2>
      <div className="flex gap-3">
        <CalendarDays className="mt-1 size-5 shrink-0" strokeWidth={1.4} />
        <p className="text-sm text-muted-foreground">
          {tx(
            "الاستشارة الأولى مجانية، ومدة الاستشارة ونطاقها يُحدّدان مع المكتب.",
          )}
        </p>
      </div>
      <div className="flex gap-3">
        <LockKeyhole className="mt-1 size-5 shrink-0" strokeWidth={1.4} />
        <p className="text-sm text-muted-foreground">
          {tx(
            "نحتاج وصفًا عامًا فقط الآن. تُناقش التفاصيل والمستندات بعد التواصل.",
          )}
        </p>
      </div>
      <p className="border-t border-border pt-5 text-xs text-muted-foreground">
        {tx("طلب الاستشارة لا يُعد توكيلًا ولا يؤكد الموعد تلقائيًا.")}
      </p>
    </aside>
  );
}
