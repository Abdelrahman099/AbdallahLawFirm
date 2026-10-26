import { useTranslate } from "@/i18n/useTranslate";
import { Controller, type Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ConsultationValues } from "../schema";

const preferences = [
  {
    name: "audience",
    label: "صفة العميل",
    options: [
      ["business", "شركة / مستثمر"],
      ["individual", "فرد"],
    ],
  },
  {
    name: "method",
    label: "طريقة الاستشارة",
    options: [
      ["remote", "عن بُعد"],
      ["office", "بالمكتب"],
    ],
  },
] as const;

export function QuickPreferences({
  control,
}: {
  control: Control<ConsultationValues>;
}) {
  const { tx, dir } = useTranslate();

  return (
    <div className="home-contact-preferences">
      {preferences.map(({ name, label, options }) => (
          <fieldset key={name}>
            <legend
              className="mb-2 text-sm font-medium"
              id={`home-${name}-label`}
            >
              {tx(label)}
            </legend>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  dir={dir}
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-labelledby={`home-${name}-label`}
                  className="flex flex-wrap gap-x-4 gap-y-1"
                >
                  {options.map(([value, title]) => (
                      <Label
                        key={value}
                        htmlFor={`home-${name}-${value}`}
                        className="min-h-11 cursor-pointer gap-2 text-sm font-normal"
                      >
                        <RadioGroupItem
                          id={`home-${name}-${value}`}
                          value={value}
                        />
                        {tx(title)}
                      </Label>
                    ))}
                </RadioGroup>
              )}
            />
          </fieldset>
        ))}
    </div>
  );
}
