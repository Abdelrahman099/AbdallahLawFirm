import { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/data/services";
import { office } from "@/config/office";
import { Field, FieldGroup } from "./components/Field";
import { QuickPreferences } from "./components/QuickPreferences";
import { RequestReview } from "./components/RequestReview";
import { useConsultation } from "./useConsultation";

export function QuickConsultationForm() {
  const state = useConsultation("general");
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(state.step);
  const {
    register,
    control,
    formState: { errors },
  } = state.form;
  useEffect(() => {
    if (previousStep.current !== state.step) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "start" });
      previousStep.current = state.step;
    }
  }, [state.step]);

  return (
    <div className="home-contact-form">
      <h3
        ref={heading}
        tabIndex={-1}
        id="home-form-heading"
        className="home-contact-form-heading"
      >
        {state.step === 3 ? "مراجعة طلب الاستشارة" : "احكِ لنا عن موضوعك."}
      </h3>
      {state.step === 3 && state.values ? (
        <RequestReview
          values={state.values}
          sending={state.sending}
          requestId={state.requestId}
          error={state.error}
          send={state.send}
          edit={state.edit}
        />
      ) : (
        <form
          noValidate
          aria-labelledby="home-form-heading"
          onSubmit={state.form.handleSubmit(state.review)}
        >
          <FieldGroup>
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <Field
                id="home-name"
                label="الاسم"
                required
                error={errors.name?.message}
              >
                <Input
                  id="home-name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="h-12 bg-background"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "home-name-error" : undefined}
                />
              </Field>
              <Field
                id="home-phone"
                label="رقم الجوال"
                required
                error={errors.phone?.message}
              >
                <Input
                  id="home-phone"
                  type="tel"
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={25}
                  required
                  className="h-12 bg-background"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={
                    errors.phone ? "home-phone-error" : undefined
                  }
                />
              </Field>
            </FieldGroup>
            <QuickPreferences control={control} />
            <Field
              id="home-service"
              label="مجال الاستشارة"
              required
              error={errors.service?.message}
            >
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Select
                    dir="rtl"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="home-service"
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-required="true"
                      className="w-full bg-background data-[size=default]:h-12"
                      aria-invalid={!!errors.service}
                      aria-describedby={
                        errors.service ? "home-service-error" : undefined
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" className="max-h-72">
                      <SelectGroup>
                        <SelectItem value="general">
                          استشارة عامة / مجال آخر
                        </SelectItem>
                        {services.map((service) => (
                          <SelectItem key={service.slug} value={service.slug}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field
              id="home-summary"
              label="ملخص الموضوع"
              error={errors.summary?.message}
            >
              <Textarea
                id="home-summary"
                rows={3}
                maxLength={500}
                className="min-h-28 resize-none bg-background"
                {...register("summary")}
                aria-invalid={!!errors.summary}
                aria-describedby={`home-summary-hint${errors.summary ? " home-summary-error" : ""}`}
              />
              <p
                id="home-summary-hint"
                className="text-xs text-muted-foreground"
              >
                وصف عام دون مستندات أو بيانات حساسة.
              </p>
            </Field>
            <div data-invalid={!!errors.consent || undefined}>
              <div className="flex min-h-11 items-start gap-3">
                <Controller
                  name="consent"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="home-consent"
                      ref={field.ref}
                      checked={field.value}
                      onCheckedChange={(value) =>
                        field.onChange(value === true)
                      }
                      className="mt-1.5 size-5 shrink-0"
                      aria-required="true"
                      aria-invalid={!!errors.consent}
                      aria-describedby={
                        errors.consent ? "home-consent-error" : undefined
                      }
                    />
                  )}
                />
                <Label
                  htmlFor="home-consent"
                  className="block cursor-pointer text-xs font-normal leading-7"
                >
                  اطلعت على{" "}
                  <Link
                    to="/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                  >
                    الخصوصية
                  </Link>{" "}
                  و
                  <Link
                    to="/terms"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                  >
                    شروط الاستخدام
                  </Link>
                  ، وأوافق على التواصل بشأن طلبي. *
                </Label>
              </div>
              {errors.consent && (
                <p
                  id="home-consent-error"
                  className="text-xs text-destructive"
                  role="alert"
                >
                  {errors.consent.message}
                </p>
              )}
            </div>
            <div hidden aria-hidden="true">
              <label htmlFor="home-website">Website</label>
              <input
                id="home-website"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" className="h-12 px-7">
                راجع طلبك
              </Button>
              <p className="max-w-64 text-xs leading-6 text-muted-foreground">
                {office.endpoint
                  ? "راجع البيانات قبل إرسالها للمكتب."
                  : "بعد المراجعة، افتح رسالتي البريد والواتساب وأكمل الإرسال."}
              </p>
            </div>
          </FieldGroup>
        </form>
      )}
    </div>
  );
}
