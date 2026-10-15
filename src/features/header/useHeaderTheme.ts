import { useEffect, useState } from "react";
export const headerThemes = [
  {
    id: "strip",
    name: "شريط أخضر + هيدر عاجي",
    note: "بديل للمقارنة: لون البراند في الأعلى، ومساحة فاتحة للتنقّل.",
  },
  {
    id: "forest",
    name: "هيدر أخضر بالكامل",
    note: "الشكل الرئيسي: هيدر أخضر بلا شريط علوي، مع الشعار وزر الاستشارة بالبيج.",
  },
  {
    id: "minimal",
    name: "هيدر عاجي بدون شريط",
    note: "مدخل مختصر ومساحة أكبر للمحتوى.",
  },
] as const;
export type HeaderTheme = (typeof headerThemes)[number]["id"];
export const defaultHeaderTheme: HeaderTheme = "forest";
export const headerStorageKey = "shehri-header-approved-v3";
export function useHeaderTheme() {
  const [theme, setTheme] = useState<HeaderTheme>(defaultHeaderTheme);
  useEffect(() => {
    const update = () => {
      try {
        const id = localStorage.getItem(headerStorageKey);
        setTheme(
          headerThemes.find((t) => t.id === id)?.id || defaultHeaderTheme,
        );
      } catch {
        /* Default theme remains visible. */
      }
    };
    update();
    window.addEventListener("header-selection", update);
    return () => window.removeEventListener("header-selection", update);
  }, []);
  return theme;
}
