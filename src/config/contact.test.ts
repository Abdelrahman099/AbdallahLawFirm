import { describe, expect, it } from "vitest";
import { contactNumber, contactWhatsAppUrl } from "./contact";
import { office, whatsappUrl } from "./office";

describe("office contact routing", () => {
  it("normalizes Saudi local and international numbers for external applications", () => {
    for (const value of [
      "0550379331",
      "+966 55 037 9331",
      "00966550379331",
      "٠٥٥٠٣٧٩٣٣١",
    ])
      expect(contactNumber(value)).toBe("+966550379331");
    expect(contactWhatsAppUrl("", "message")).toBe("");
  });

  it("keeps the call-only line separate from the WhatsApp recipient", () => {
    expect(office.phone).not.toBe(office.whatsapp);
    const message = "طلب استشارة & عقد؟\nسطر ثانٍ";
    const link = new URL(whatsappUrl(message));
    expect(link.pathname).toBe(`/${office.whatsapp.slice(1)}`);
    expect(link.pathname).not.toBe(`/${office.phone.slice(1)}`);
    expect(link.searchParams.get("text")).toBe(message);
  });
});
