import { useState } from "react";
import {
  CalendarDays,
  Check,
  Copy,
  Download,
  LoaderCircle,
  CircleAlert,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { office, whatsappUrl } from "@/config/office";
import { Arrow } from "@/components/brand/Arrow";
import type { ConsultationValues } from "../schema";
import { normalizePhone } from "../schema";
import {
  consultationSummary,
  consultationEmailUrl,
  downloadSummary,
  serviceTitle,
} from "../summary";

type Props = {
  values: ConsultationValues;
  sending: boolean;
  requestId: string;
  error: string;
  send: () => Promise<void>;
  edit: () => void;
};
export function RequestReview({
  values,
  sending,
  requestId,
  error,
  send,
  edit,
}: Props) {
  const [notice, setNotice] = useState("");
  const rows = [
    ["الاسم", values.name],
    ["الجوال", normalizePhone(values.phone)],
    ["الخدمة", serviceTitle(values.service)],
    ["الطريقة", values.method === "remote" ? "عن بُعد" : "بالمكتب"],
    ...(values.date ? [["تاريخ مفضّل", values.date]] : []),
    ...(values.summary ? [["ملخص الموضوع", values.summary]] : []),
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(consultationSummary(values));
      setNotice("تم نسخ الملخص.");
    } catch {
      setNotice("تعذّر النسخ؛ يمكنك تنزيل الملخص بدلًا منه.");
    }
  }
  return (
    <div className="request-review space-y-5">
      <div className="grid size-13 place-items-center rounded-full border border-border">
        {requestId ? <Check /> : <CalendarDays />}
      </div>
      <h2 className="text-3xl">
        {requestId ? "وصل طلبك للمكتب." : "طلبك جاهز للمراجعة."}
      </h2>
      <p className="text-sm text-muted-foreground">
        {requestId
          ? "سيتواصل معك المكتب لترتيب الموعد؛ الوقت المختار لا يصبح مؤكدًا إلا بعد التواصل."
          : office.endpoint
            ? "راجع بياناتك قبل إرسال الطلب للمكتب."
            : "راجع بياناتك ثم أكمل الإرسال بوسيلة التواصل المتاحة. تجهيز الملخص لا يعني إرسال الطلب أو تأكيد الموعد."}
      </p>
      {requestId && (
        <p className="bg-secondary p-4 text-sm">
          رقم الطلب: <b dir="ltr">{requestId}</b>
        </p>
      )}
      <dl>
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[90px_1fr] gap-5 border-b border-border py-4 text-sm"
          >
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="m-0 break-words">{value}</dd>
          </div>
        ))}
      </dl>
      {error && (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-wrap items-center gap-4">
        {office.email &&
          !requestId &&
          !sending &&
          (!office.endpoint || error) && (
            <Button asChild className="h-12">
              <a
                href={consultationEmailUrl(values)}
                onClick={() =>
                  setNotice(
                    "أكمل الإرسال من تطبيق البريد. فتح الرسالة لا يعني وصولها للمكتب.",
                  )
                }
              >
                <Mail /> افتح الطلب في البريد
              </a>
            </Button>
          )}
        {office.endpoint && !requestId && (
          <Button
            disabled={sending}
            onClick={() => void send()}
            className="h-12 gap-4 px-5"
          >
            {sending ? (
              <>
                <LoaderCircle className="animate-spin" />
                جارٍ الإرسال
              </>
            ) : (
              <>
                أرسل الطلب للمكتب <Arrow />
              </>
            )}
          </Button>
        )}
        {office.phone && !requestId && (
          <Button asChild className="h-12">
            <a
              href={whatsappUrl(consultationSummary(values))}
              target="_blank"
              rel="noreferrer"
            >
              أكمل الإرسال عبر واتساب <Arrow />
            </a>
          </Button>
        )}
        {!requestId && (
          <Button
            variant="outline"
            onClick={edit}
            disabled={sending}
            className="h-12"
          >
            تعديل البيانات
          </Button>
        )}
        <Button variant="link" onClick={() => void copy()}>
          <Copy />
          نسخ الملخص
        </Button>
        <Button variant="link" onClick={() => downloadSummary(values)}>
          <Download />
          تنزيل الملخص
        </Button>
      </div>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {notice}
      </p>
    </div>
  );
}
