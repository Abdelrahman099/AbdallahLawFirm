import { describe, it, expect } from "vitest";
import ar from "./locales/ar.json";
import en from "./locales/en.json";
import {
  createLanguage,
  languagePath,
  languageFromPath,
  stripLanguage,
} from "./config";
import { consultationSummary } from "@/features/consultation/summary";
import { defaultValues } from "@/features/consultation/schema";
import { services } from "@/data/services";
import { matchesQuery } from "@/features/services/serviceSearch";

describe("complete bilingual resources", () => {
  it("keeps matching Arabic and English keys with complete English values", () => {
    expect(Object.keys(ar).sort()).toEqual(Object.keys(en).sort());
    expect(
      Object.values(en).every(
        (value) => value.length > 0 && !/[\u0621-\u064a]/.test(value),
      ),
    ).toBe(true);
  });
  it("isolates server-rendered languages between requests", () => {
    const arabic = createLanguage("ar"),
      english = createLanguage("en");
    expect(arabic.t("الخدمات")).toBe("الخدمات");
    expect(english.t("الخدمات")).toBe("Services");
    expect(arabic.language).toBe("ar");
  });
  it("preserves service queries and fragments when switching language", () => {
    expect(languagePath("/services?group=business#details", "en")).toBe(
      "/en/services?group=business#details",
    );
    expect(languagePath("/en/services?group=business#details", "ar")).toBe(
      "/services?group=business#details",
    );
    expect(languagePath("/", "en")).toBe("/en");
    expect(stripLanguage("/en")).toBe("/");
    expect(languageFromPath("/en/services")).toBe("en");
    expect(languagePath("https://example.com", "en")).toBe(
      "https://example.com",
    );
  });
  it("localizes message labels without changing client-entered data or inventing preferences", () => {
    const t = createLanguage("en").getFixedT("en");
    const values = {
      ...defaultValues,
      name: "عبد الله",
      phone: "0550123456",
      service: "general",
      summary: "عقد العميل & private",
      consent: true,
    };
    const message = consultationSummary(
      values,
      (source) => String(t(source)),
      false,
    );
    expect(message).toContain("Name: عبد الله");
    expect(message).toContain(values.summary);
    expect(message).toContain("Service: General consultation");
    expect(message).not.toContain("Company / Investor");
    expect(message).not.toContain("Preferred format");
  });
  it("searches translated service descriptions", () => {
    const t = createLanguage("en").getFixedT("en");
    const service = services.find((service) => service.slug === "estates")!;
    expect(
      matchesQuery(service, "inheritance", (source) => String(t(source))),
    ).toBe(true);
  });
});
