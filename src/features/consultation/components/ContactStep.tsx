import { useTranslate } from "@/i18n/useTranslate";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ConsultationValues } from "../schema";
import { Field } from "./Field";

export function ContactStep({
  form,
}: {
  form: UseFormReturn<ConsultationValues>;
}) {
  const { tx, dir } = useTranslate();

  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <Field
        id="name"
        label={tx("الاسم الكامل")}
        required
        error={errors.name?.message}
      >
        <Input
          id="name"
          autoComplete="name"
          placeholder={tx("اكتب اسمك")}
          maxLength={100}
          className="h-13 bg-card"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>
      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id="phone"
          label={tx("رقم الجوال")}
          required
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder="+966 5X XXX XXXX"
            maxLength={25}
            className="h-13 bg-card"
            {...register("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </Field>
        <Field
          id="email"
          label={tx("البريد الإلكتروني")}
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            className="h-13 bg-card"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-3 text-sm">{tx("أطلب الاستشارة بصفتي")}</legend>
        <Controller
          name="audience"
          control={control}
          render={({ field }) => (
            <RadioGroup
              dir={dir}
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-2 gap-3"
            >
              {[
                  ["business", "شركة / مستثمر"],
                  ["individual", "فرد"],
                ].map(([value, title]) => (
                  <Label
                    key={value}
                    htmlFor={"audience-" + value}
                    className="flex min-h-13 cursor-pointer items-center gap-3 border border-input p-4 has-[[data-state=checked]]:bg-secondary"
                  >
                    <RadioGroupItem id={"audience-" + value} value={value} />
                    {tx(title)}
                  </Label>
                ))}
            </RadioGroup>
          )}
        />
      </fieldset>
      <Button type="submit" className="h-13 gap-7 rounded-xs px-6">
        {tx("الخطوة التالية")}
        <ArrowLeft />
      </Button>
    </div>
  );
}
