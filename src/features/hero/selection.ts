import { useEffect, useState } from "react";
export const defaultHeroId = "cinematic";
export const heroIds = [
  "scroll-3d",
  "cinematic",
  "editorial",
  "panorama",
  "offset",
  "chapters",
  "statement",
  "curtain",
  "orbit",
  "practice",
] as const;
export function useHeroChoice() {
  const [id, setId] = useState<string>(defaultHeroId);
  useEffect(() => {
    const update = () => {
      try {
        const saved = localStorage.getItem("shehri-hero");
        setId(heroIds.some((id) => id === saved) ? saved! : defaultHeroId);
      } catch {
        /* The default remains usable without storage. */
      }
    };
    update();
    window.addEventListener("hero-selection", update);
    return () => window.removeEventListener("hero-selection", update);
  }, []);
  return id;
}
