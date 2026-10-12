import { useEffect, useState } from "react";

export type HeroPresentation = {
  layout: "split" | "immersive";
  overlay: "soft" | "balanced" | "deep" | "ink";
};
export const defaultPresentation: HeroPresentation = {
  layout: "split",
  overlay: "balanced",
};
export const overlayOptions = [
  { id: "soft", name: "إضاءة طبيعية" },
  { id: "balanced", name: "أخضر متوازن" },
  { id: "deep", name: "أخضر عميق" },
  { id: "ink", name: "تباين داكن" },
] as const;
export function saveHeroPresentation(value: HeroPresentation) {
  localStorage.setItem("shehri-slider-presentation", JSON.stringify(value));
  window.dispatchEvent(new Event("slider-presentation"));
}
export function useHeroPresentation() {
  const [value, setValue] = useState<HeroPresentation>(defaultPresentation);
  useEffect(() => {
    const update = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("shehri-slider-presentation") || "null",
        );
        if (
          saved &&
          ["split", "immersive"].includes(saved.layout) &&
          overlayOptions.some((v) => v.id === saved.overlay)
        )
          setValue(saved);
      } catch {
        /* Keep the default when storage is unavailable. */
      }
    };
    update();
    window.addEventListener("slider-presentation", update);
    return () => window.removeEventListener("slider-presentation", update);
  }, []);
  return value;
}
