import { z } from "zod";

export function normalizePhone(value: string) {
  return value
    .replace(/[٠-٩]/g, (c) => String("٠١٢٣٤٥٦٧٨٩".indexOf(c)))
    .replace(/[۰-۹]/g, (c) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(c)))
    .replace(/[\s()-]/g, "");
}
export function localToday() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}
export function validPreferredDate(value: string) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T12:00:00Z");
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value &&
    value >= localToday()
  );
}
export const consultationSchema = z.object({
  name: z.string().trim().min(2, "اكتب اسمًا من حرفين على الأقل.").max(100),
  phone: z
    .string()
    .refine(
      (value) => /^\+?\d{8,15}$/.test(normalizePhone(value)),
      "اكتب رقم جوال صحيحًا من 8 إلى 15 رقمًا.",
    ),
  email: z.union([
    z.literal(""),
    z.string().email("راجع كتابة البريد الإلكتروني.").max(150),
  ]),
  audience: z.enum(["business", "individual"]),
  service: z.string().min(1, "اختر مجال الاستشارة أو الاستشارة العامة."),
  method: z.enum(["remote", "office"]),
  date: z
    .string()
    .refine(validPreferredDate, "اختر تاريخًا صحيحًا، اليوم أو بعده."),
  summary: z.string().max(500),
  consent: z
    .boolean()
    .refine(
      (value) => value,
      "يلزم الاطلاع على الخصوصية والموافقة على التواصل بشأن الطلب.",
    ),
  website: z.string().max(0),
});
export type ConsultationValues = z.infer<typeof consultationSchema>;
export const defaultValues: ConsultationValues = {
  name: "",
  phone: "",
  email: "",
  audience: "business",
  service: "",
  method: "remote",
  date: "",
  summary: "",
  consent: false,
  website: "",
};
