import { useTranslate } from "@/i18n/useTranslate";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  Copy,
  Download,
  LoaderCircle,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { office } from "@/config/office";
import { RequestDeliveryLinks } from "./RequestDeliveryLinks";
import { Arrow } from "@/components/brand/Arrow";
import type { ConsultationValues } from "../schema";
import { normalizePhone } from "../schema";
import { consultationSummary, downloadSummary, serviceTitle } from "../summary";

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
  const { tx } = useTranslate();

  const [notice, setNotice] = useState("");
  const rows = [
    ["الاسم", values.name],
    ["الجوال", normalizePhone(values.phone)],
    ...(values.email ? [["البريد الإلكتروني", values.email]] : []),
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
        {tx(requestId ? <Check /> : <CalendarDays />)}
      </div>
      <h2 className="text-3xl">
        {tx(requestId ? "وصل طلبك للمكتب." : "طلبك جاهز للمراجعة.")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {tx(
          requestId
            ? "سيتواصل معك المكتب لترتيب الموعد؛ الوقت المختار لا يصبح مؤكدًا إلا بعد التواصل."
            : office.endpoint
              ? "راجع بياناتك قبل إرسال الطلب للمكتب."
              : "راجع بياناتك، ثم أرسل نفس الملخص النصي للبريد والواتساب بالأسفل. الموعد يُؤكد بعد التواصل مع المكتب.",
        )}
      </p>
      {tx(
        requestId && (
          <p className="bg-secondary p-4 text-sm">
            {tx("رقم الطلب:")}
            <b dir="ltr">{tx(requestId)}</b>
          </p>
        ),
      )}
      <dl>
        {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[90px_1fr] gap-5 border-b border-border py-4 text-sm"
            >
              <dt className="text-muted-foreground">{tx(label)}</dt>
              <dd className="m-0 break-words">{tx(value)}</dd>
            </div>
          ))}
      </dl>
      {tx(
        error && (
          <Alert variant="destructive">
            <CircleAlert />
            <AlertDescription>{tx(error)}</AlertDescription>
          </Alert>
        ),
      )}
      {tx(
        !requestId && !sending && (!office.endpoint || error) && (
          <RequestDeliveryLinks values={values} onDraftOpen={setNotice} />
        ),
      )}
      <div className="flex flex-wrap items-center gap-4">
        {tx(
          office.endpoint && !requestId && (
            <Button
              disabled={sending}
              onClick={() => void send()}
              className="h-12 gap-4 px-5"
            >
              {tx(
                sending ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    {tx("جارٍ الإرسال")}
                  </>
                ) : (
                  <>
                    {tx("أرسل الطلب للمكتب")}
                    <Arrow />
                  </>
                ),
              )}
            </Button>
          ),
        )}
        {tx(
          !requestId && (
            <Button
              variant="outline"
              onClick={edit}
              disabled={sending}
              className="h-12"
            >
              {tx("تعديل البيانات")}
            </Button>
          ),
        )}
        <Button variant="link" onClick={() => void copy()}>
          <Copy />
          {tx("نسخ الملخص")}
        </Button>
        <Button variant="link" onClick={() => downloadSummary(values)}>
          <Download />
          {tx("تنزيل الملخص")}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {tx(notice)}
      </p>
    </div>
  );
}
