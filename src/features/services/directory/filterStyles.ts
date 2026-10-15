import { useEffect, useState } from "react";

export const filterStyles = [
  {
    id: "classic",
    name: "الشكل السابق",
    note: "كروت المجالات بالصور، ثم نوع العميل والبحث في سطر واحد.",
  },
  {
    id: "tabs",
    name: "تابات بخط سفلي",
    note: "كلمات هادئة بخط برونزي تحت الاختيار، بنفس روح تابات الهيرو.",
  },
  {
    id: "cards",
    name: "كروت المجالات",
    note: "كروت أكبر بالصور والوصف والعدد، وتحتها شريط بحث صغير.",
  },
  {
    id: "sidebar",
    name: "قائمة جانبية",
    note: "عمود ثابت للبحث والتصفية بجانب الخدمات، ونافذة من أسفل على الموبايل.",
  },
  {
    id: "chips",
    name: "أزرار مدوّرة",
    note: "مربع بحث كبير وصفّان من الأزرار بالأعداد.",
  },
] as const;

export type FilterStyle = (typeof filterStyles)[number]["id"];
export const defaultFilterStyle: FilterStyle = "cards";
const storageKey = "shehri-services-filter";

export const isFilterStyle = (value: unknown): value is FilterStyle =>
  filterStyles.some((style) => style.id === value);

export function saveFilterStyle(value: FilterStyle) {
  localStorage.setItem(storageKey, value);
  window.dispatchEvent(new Event("services-filter-style"));
}

export function useFilterStyle() {
  const [value, setValue] = useState<FilterStyle>(defaultFilterStyle);
  useEffect(() => {
    const update = () => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (isFilterStyle(saved)) setValue(saved);
      } catch {
        /* Keep the default when storage is unavailable. */
      }
    };
    update();
    window.addEventListener("services-filter-style", update);
    return () => window.removeEventListener("services-filter-style", update);
  }, []);
  return value;
}
