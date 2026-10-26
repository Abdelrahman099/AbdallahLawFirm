import { createInstance } from "i18next";
import ar from "./locales/ar.json";
import en from "./locales/en.json";
export type Language = "ar" | "en";
export const languageFromPath = (path: string): Language =>
  /^\/en(?:\/|$)/.test(path) ? "en" : "ar";
export const stripLanguage = (path: string) =>
  path.replace(/^\/en(?=\/|$)/, "") || "/";
export const languagePath = (path: string, language: Language) => {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const clean = stripLanguage(path);
  return language === "en" ? `/en${clean === "/" ? "" : clean}` : clean;
};
export function createLanguage(language: Language) {
  const instance = createInstance();
  void instance.init({
    lng: language,
    fallbackLng: "ar",
    supportedLngs: ["ar", "en"],
    resources: { ar: { translation: ar }, en: { translation: en } },
    keySeparator: false,
    nsSeparator: false,
    initAsync: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}
