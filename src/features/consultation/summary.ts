import { office } from "@/config/office";
import { services } from "@/data/services";
import type { ConsultationValues } from "./schema";
import { normalizePhone } from "./schema";

export function serviceTitle(slug: string) {
  return services.find((s) => s.slug === slug)?.title || "استشارة عامة";
}
export function consultationSummary(values: ConsultationValues) {
  return [
    `طلب استشارة — ${office.name}`,
    `الاسم: ${values.name}`,
    `الجوال: ${normalizePhone(values.phone)}`,
    ...(values.email ? [`البريد الإلكتروني: ${values.email}`] : []),
    `الخدمة: ${serviceTitle(values.service)}`,
    `صفة العميل: ${values.audience === "business" ? "شركة / مستثمر" : "فرد"}`,
    `الطريقة المفضلة: ${values.method === "remote" ? "عن بُعد" : "بالمكتب"}`,
    ...(values.date ? [`تاريخ مفضّل: ${values.date}`] : []),
    ...(values.summary ? [`ملخص الموضوع: ${values.summary}`] : []),
    "الموعد يُؤكد بعد التواصل مع المكتب.",
  ].join("\n");
}
export function consultationEmailUrl(values: ConsultationValues) {
  if (!office.email) return "";
  const subject = encodeURIComponent(`طلب استشارة — ${office.name}`);
  return `mailto:${office.email}?subject=${subject}&body=${encodeURIComponent(consultationSummary(values))}`;
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
