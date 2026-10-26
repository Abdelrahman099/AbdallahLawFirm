import { useTranslate } from "@/i18n/useTranslate";
import { Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { office, whatsappUrl } from "@/config/office";
import { consultationEmailUrl, consultationSummary } from "../summary";
import type { ConsultationValues } from "../schema";

type Props = {
  values: ConsultationValues;
  onDraftOpen: (message: string) => void;
};

export function RequestDeliveryLinks({ values, onDraftOpen }: Props) {
  const { tx } = useTranslate();

  return (
    <section
      aria-labelledby="request-delivery-title"
      className="flex flex-col gap-3 border border-border bg-card p-5"
    >
      <h3 id="request-delivery-title" className="text-lg">
        {tx("أرسل طلبك للبريد والواتساب")}
      </h3>
      <p className="text-sm text-muted-foreground">
        {tx(
          "بياناتك جاهزة كنص في الرسالتين، بدون مرفقات. افتح كل رسالة وأكمل إرسالها من تطبيقها؛ فتح المسودة وحده لا يرسل الطلب.",
        )}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {tx(
          office.email && (
            <a
              className={cn(buttonVariants({ size: "lg" }), "min-h-12 flex-1")}
              href={consultationEmailUrl(values)}
              onClick={() =>
                onDraftOpen(
                  "أكمل إرسال رسالة البريد من تطبيقك، ثم افتح رسالة واتساب لإرسال نفس البيانات.",
                )
              }
            >
              <Mail data-icon="inline-start" aria-hidden="true" />
              {tx("افتح رسالة البريد")}
            </a>
          ),
        )}
        {tx(
          office.whatsapp && (
            <a
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-12 flex-1",
              )}
              href={whatsappUrl(consultationSummary(values))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                onDraftOpen(
                  "أكمل إرسال الرسالة داخل واتساب. أرسل رسالة البريد أيضًا لو لم ترسلها بعد؛ الموعد يُؤكد من المكتب.",
                )
              }
            >
              <WhatsAppIcon data-icon="inline-start" />
              {tx("افتح رسالة واتساب")}
              <span className="sr-only"> {tx(" (يفتح في نافذة جديدة)")}</span>
            </a>
          ),
        )}
      </div>
    </section>
  );
}
