import { CalendarDays, LockKeyhole } from "lucide-react";

export function ConsultationAside() {
  return (
    <aside className="space-y-6 bg-muted p-7 lg:sticky lg:top-6">
      <img src="/brand/mark-primary.svg" alt="" width="72" height="66" />
      <p className="text-xs text-muted-foreground">خطوة أولى، بوضوح</p>
      <h2 className="text-[29px] leading-relaxed">
        الموضوع يهمك.
        <br />
        والتفاصيل تهمّنا.
      </h2>
      <div className="flex gap-3">
        <CalendarDays className="mt-1 size-5 shrink-0" strokeWidth={1.4} />
        <p className="text-sm text-muted-foreground">
          الاستشارة الأولى مجانية، ومدة الاستشارة ونطاقها يُحدّدان مع المكتب.
        </p>
      </div>
      <div className="flex gap-3">
        <LockKeyhole className="mt-1 size-5 shrink-0" strokeWidth={1.4} />
        <p className="text-sm text-muted-foreground">
          نحتاج وصفًا عامًا فقط الآن. تُناقش التفاصيل والمستندات بعد التواصل.
        </p>
      </div>
      <p className="border-t border-border pt-5 text-xs text-muted-foreground">
        طلب الاستشارة لا يُعد توكيلًا ولا يؤكد الموعد تلقائيًا.
      </p>
    </aside>
  );
}
