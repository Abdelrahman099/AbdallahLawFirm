import type { Service } from "@/data/services";

const normalize = (value: string) =>
  value
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

export function matchesQuery(
  service: Service,
  query: string,
  translate: (source: string) => string = (source) => source,
) {
  const words = normalize(query).split(" ").filter(Boolean);
  if (!words.length) return true;
  const text = normalize(
    [service.title, service.short, service.intro, service.forWhom]
      .map(translate)
      .join(" "),
  );
  return words.every((word) => text.includes(word));
}
