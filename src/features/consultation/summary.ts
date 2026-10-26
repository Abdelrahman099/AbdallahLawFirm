import { office } from "@/config/office";
import { services } from "@/data/services";
import type { ConsultationValues } from "./schema";
import { normalizePhone } from "./schema";

export function serviceTitle(slug: string) {
  return services.find((s) => s.slug === slug)?.title || "استشارة عامة";
}
export function consultationSummary(
  values: ConsultationValues,
  translate: (source: string) => string = (source) => source,
  includePreferences = true,
) {
  return [
    `${translate("طلب استشارة")} — ${translate(office.name)}`,
    `${translate("الاسم")}: ${values.name}`,
    `${translate("الجوال")}: ${normalizePhone(values.phone)}`,
    ...(values.email
      ? [`${translate("البريد الإلكتروني")}: ${values.email}`]
      : []),
    `${translate("الخدمة")}: ${translate(serviceTitle(values.service))}`,
    ...(includePreferences
      ? [
          `${translate("صفة العميل")}: ${translate(values.audience === "business" ? "شركة / مستثمر" : "فرد")}`,
        ]
      : []),
    ...(includePreferences
      ? [
          `${translate("الطريقة المفضلة")}: ${translate(values.method === "remote" ? "عن بُعد" : "بالمكتب")}`,
        ]
      : []),
    ...(values.date ? [`${translate("تاريخ مفضّل")}: ${values.date}`] : []),
    ...(values.summary
      ? [`${translate("ملخص الموضوع")}: ${values.summary}`]
      : []),
    translate("الموعد يُؤكد بعد التواصل مع المكتب."),
  ].join("\n");
}
export function consultationEmailUrl(
  values: ConsultationValues,
  translate: (source: string) => string = (source) => source,
  includePreferences = true,
) {
  if (!office.email) return "";
  const subject = encodeURIComponent(
    `${translate("طلب استشارة")} — ${translate(office.name)}`,
  );
  return `mailto:${office.email}?subject=${subject}&body=${encodeURIComponent(consultationSummary(values, translate, includePreferences))}`;
}
export function downloadSummary(values: ConsultationValues) {
  const url = URL.createObjectURL(
    new Blob([consultationSummary(values)], {
      type: "text/plain;charset=utf-8",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "consultation-summary.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
