import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/data/services";
import { whatsappUrl } from "@/config/office";
import { cn } from "@/lib/utils";
import { Field, FieldGroup } from "./components/Field";
import {
  consultationSchema,
  defaultValues,
  type ConsultationValues,
} from "./schema";
import { consultationSummary, consultationEmailUrl } from "./summary";

export function SimpleConsultationForm() {
  const { tx, t } = useTranslate();

  const id = useId();
  const [params] = useSearchParams();
  const [notice, setNotice] = useState("");
  const selected =
    services.find((s) => s.slug === params.get("service"))?.slug || "general";
  const form = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { ...defaultValues, service: selected },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const values = watch();
  function validate(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!consultationSchema.safeParse(form.getValues()).success) {
      event.preventDefault();
      void form.trigger(undefined, { shouldFocus: true });
      return;
    }
    setNotice("أكمل إرسال الرسالة من تطبيقك. يتواصل المكتب معك لتأكيد الموعد.");
  }
  return (
    <form
      noValidate
      className="simple-consultation-form"
      onSubmit={(e) => e.preventDefault()}
      aria-label={tx("طلب استشارة")}
    >
      <FieldGroup>
        <p className="text-sm text-muted-foreground">
          {tx("بيانات بسيطة، وتواصل مباشر مع المكتب.")}
        </p>
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${id}-name`}
            label={tx("الاسم")}
            required
            error={errors.name?.message}
          >
            <Input
              id={`${id}-name`}
              autoComplete="name"
              maxLength={100}
              required
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
            />
          </Field>
          <Field
            id={`${id}-phone`}
            label={tx("رقم الجوال")}
            required
            error={errors.phone?.message}
          >
            <Input
              id={`${id}-phone`}
              type="tel"
              inputMode="tel"
              dir="ltr"
              autoComplete="tel"
              maxLength={25}
              required
              {...register("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            />
          </Field>
        </FieldGroup>
        <Field
          id={`${id}-service`}
          label={tx("نوع الخدمة")}
          error={errors.service?.message}
        >
          <select
            id={`${id}-service`}
            className="h-12 w-full rounded-xs border border-input bg-background px-3 text-sm"
            {...register("service")}
          >
            <option value="general">{tx("استشارة عامة / لست متأكدًا")}</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {tx(service.title)}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id={`${id}-summary`}
          label={tx("رسالتك")}
          error={errors.summary?.message}
        >
          <Textarea
            id={`${id}-summary`}
            rows={3}
            maxLength={500}
            className="min-h-24 resize-none"
            {...register("summary")}
            aria-describedby={`${id}-hint`}
          />
          <p id={`${id}-hint`} className="text-xs text-muted-foreground">
            {tx("اختياري. اكتب فكرة عامة دون بيانات حساسة.")}
          </p>
        </Field>
        <div>
          <label
            className="flex min-h-11 cursor-pointer items-start gap-3 text-xs leading-7"
            htmlFor={`${id}-consent`}
          >
            <input
              id={`${id}-consent`}
              type="checkbox"
              className="mt-1.5 size-5 shrink-0 accent-primary"
              {...register("consent")}
              aria-invalid={!!errors.consent}
              aria-describedby={
                errors.consent ? `${id}-consent-error` : undefined
              }
            />
            <span>
              {tx("أوافق على التواصل بشأن طلبي، وأطلعت على ")}
              <Link to="/privacy" target="_blank" className="underline">
                {tx("سياسة الخصوصية")}
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p
              id={`${id}-consent-error`}
              className="text-xs text-destructive"
              role="alert"
            >
              {tx(errors.consent.message)}
            </p>
          )}
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor={`${id}-website`}>Website</label>
          <input
            id={`${id}-website`}
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappUrl(consultationSummary(values, t, false))}
            onClick={validate}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "min-h-12")}
          >
            <WhatsAppIcon /> {tx(" إرسال عبر واتساب")}
          </a>
          <a
            href={consultationEmailUrl(values, t, false)}
            onClick={validate}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-12",
            )}
          >
            <Mail aria-hidden="true" /> {tx(" إرسال عبر البريد")}
          </a>
        </div>
        <p className="text-xs leading-6 text-muted-foreground" role="status">
          {tx(
            notice ||
              "يفتح التطبيق برسالتك جاهزة؛ أكمل الإرسال منه. الموعد يُؤكد من المكتب.",
          )}
        </p>
      </FieldGroup>
    </form>
  );
}
