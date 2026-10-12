import { useEffect, useState } from "react";
export const headerThemes = [
  {
    id: "strip",
    name: "شريط أخضر + هيدر عاجي",
    note: "الشكل الرئيسي المعتمد: لون البراند في الأعلى، ومساحة واضحة للتنقّل.",
  },
  {
    id: "forest",
    name: "هيدر أخضر بالكامل",
    note: "حضور أقوى للبراند، مع الشعار العكسي وزر عاجي.",
  },
  {
    id: "minimal",
    name: "هيدر عاجي بدون شريط",
    note: "مدخل مختصر ومساحة أكبر للمحتوى.",
  },
] as const;
export type HeaderTheme = (typeof headerThemes)[number]["id"];
export const defaultHeaderTheme: HeaderTheme = "strip";
export function useHeaderTheme() {
  const [theme, setTheme] = useState<HeaderTheme>(defaultHeaderTheme);
  useEffect(() => {
    const update = () => {
      try {
        const id = localStorage.getItem("shehri-header");
        setTheme(headerThemes.find((t) => t.id === id)?.id || defaultHeaderTheme);
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
