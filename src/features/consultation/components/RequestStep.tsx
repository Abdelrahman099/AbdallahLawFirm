import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import type { ConsultationValues } from "../schema";
import { localToday } from "../schema";
import { Field } from "./Field";

export function RequestStep({
  form,
  back,
}: {
  form: UseFormReturn<ConsultationValues>;
  back: () => void;
}) {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <Field
        id="service"
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
                id="service"
                ref={field.ref}
                className="h-13 w-full bg-card text-base"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "service-error" : undefined}
              >
                <SelectValue placeholder="اختر الخدمة" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.title}
                  </SelectItem>
                ))}
                <SelectItem value="general">استشارة عامة / مجال آخر</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="method">الطريقة المفضلة</Label>
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <Select
                dir="rtl"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="method" className="h-13 w-full bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">عن بُعد</SelectItem>
                  <SelectItem value="office">بالمكتب في جدة</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Field id="date" label="تاريخ مفضّل" error={errors.date?.message}>
          <Input
            id="date"
            type="date"
            dir="ltr"
            min={localToday()}
            className="h-13 bg-card"
            {...register("date")}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
        </Field>
      </div>
      <Field id="summary" label="ملخص الموضوع">
        <Textarea
          id="summary"
          placeholder="مثال: أرغب في استشارة بشأن تأسيس شركة جديدة."
          rows={4}
          maxLength={500}
          className="min-h-32 resize-y bg-card text-base"
          {...register("summary")}
        />
        <p className="text-left text-xs text-muted-foreground">
          {watch("summary").length} / 500
        </p>
      </Field>
      <div className="flex items-start gap-3">
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="consent"
              ref={field.ref}
              checked={field.value}
              onCheckedChange={(value) => field.onChange(value === true)}
              className="mt-1 size-5"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
          )}
        />
        <Label
          htmlFor="consent"
          className="block text-xs font-normal leading-7"
        >
          اطلعت على{" "}
          <Link
            to="/privacy"
            target="_blank"
            className="underline underline-offset-4"
          >
            الخصوصية
          </Link>{" "}
          و
          <Link
            to="/terms"
            target="_blank"
            className="underline underline-offset-4"
          >
            شروط الاستخدام
          </Link>
          ، وأوافق على التواصل بشأن طلبي. *
        </Label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="text-xs text-destructive" role="alert">
          {errors.consent.message}
        </p>
      )}
      <div className="flex items-center gap-6">
        <Button type="submit" className="h-13 gap-7 rounded-xs px-6">
          راجع الطلب <ArrowLeft />
        </Button>
        <Button type="button" variant="link" onClick={back}>
          <ArrowRight />
          رجوع
        </Button>
      </div>
    </div>
  );
}
