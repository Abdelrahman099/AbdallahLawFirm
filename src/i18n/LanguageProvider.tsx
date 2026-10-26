import { useMemo, useLayoutEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { useLocation } from "react-router-dom";
import { createLanguage, languageFromPath } from "./config";
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const instance = useMemo(() => createLanguage(language), [language]);
  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
