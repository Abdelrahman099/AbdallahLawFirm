import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { TOptions } from "i18next";
import { languagePath, type Language } from "./config";
export function useTranslate() {
  const { t: translate, i18n } = useTranslation();
  const language: Language = i18n.language === "en" ? "en" : "ar";
  const t = useCallback(
    (source: string, options?: TOptions): string => {
      const key = source.replace(/\s+/g, " ").trim();
      return String(translate(key, { defaultValue: source, ...options }));
    },
    [translate],
  );
  const tx = useCallback(
    <T>(value: T, options?: TOptions): T => {
      if (typeof value !== "string") return value;
      const start = value.match(/^\s*/)?.[0] || "",
        end = value.match(/\s*$/)?.[0] || "";
      return (start + t(value, options) + end) as T;
    },
    [t],
  );
  const path = useCallback(
    (value: string) => languagePath(value, language),
    [language],
  );
  return {
    t,
    tx,
    language,
    dir: language === "ar" ? ("rtl" as const) : ("ltr" as const),
    path,
  };
}
