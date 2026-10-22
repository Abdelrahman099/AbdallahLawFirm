import { describe, it, expect, vi, afterEach } from "vitest";
import {
  consultationSchema,
  defaultValues,
  normalizePhone,
  validPreferredDate,
} from "./schema";
import { postConsultation } from "./api";
import { consultationEmailUrl, consultationSummary } from "./summary";
import { office, whatsappUrl } from "@/config/office";

const valid = {
  ...defaultValues,
  name: "عميل اختبار",
  phone: "+٩٦٦ ٥٠ ١٢٣ ٤٥٦٧",
  service: "general",
  consent: true,
};
afterEach(() => vi.unstubAllGlobals());
describe("email draft fallback", () => {
  it("encodes the office address and complete reviewed request without sending it", () => {
    const request = {
      ...valid,
      email: "client@example.com",
      summary: "عقد شركة & توثيق؟\nالسطر الثاني",
    };
    const draft = new URL(consultationEmailUrl(request));
    expect(draft.protocol).toBe("mailto:");
    expect(draft.pathname).toBe(office.email);
    expect(draft.searchParams.get("body")).toBe(consultationSummary(request));
    expect(draft.searchParams.get("body")).toContain("+966501234567");
    expect(draft.searchParams.get("body")).toContain(request.summary);
    expect(draft.searchParams.get("body")).toContain(request.email);
    expect(draft.searchParams.get("subject")).toBe(
      `طلب استشارة — ${office.name}`,
    );
    const whatsapp = new URL(whatsappUrl(consultationSummary(request)));
    expect(whatsapp.searchParams.get("text")).toBe(
      draft.searchParams.get("body"),
    );
    expect(whatsapp.pathname).toBe(`/${office.whatsapp.slice(1)}`);
  });
});
describe("consultation validation", () => {
  it("accepts Arabic digits and normalizes the phone for delivery", () => {
    expect(consultationSchema.safeParse(valid).success).toBe(true);
    expect(normalizePhone(valid.phone)).toBe("+966501234567");
  });
  it("rejects missing consent, invalid contacts and bot fields", () => {
    for (const update of [
      { consent: false },
      { phone: "abc12345678" },
      { email: "invalid" },
      { website: "bot" },
      { name: " " },
    ])
      expect(
        consultationSchema.safeParse({ ...valid, ...update }).success,
      ).toBe(false);
  });
  it("rejects impossible and past dates", () => {
    expect(validPreferredDate("")).toBe(true);
    expect(validPreferredDate("2099-02-28")).toBe(true);
    for (const date of ["2099-02-30", "2099-13-01", "not-a-date", "2000-01-01"])
      expect(validPreferredDate(date)).toBe(false);
  });
});
describe("delivery acknowledgement", () => {
  it("requires a stored request ID and forwards a retry key", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ received: true, requestId: "REQ-123" })),
      );
    vi.stubGlobal("fetch", fetch);
    expect(
      await postConsultation(
        valid,
        "/api/consultations",
        new AbortController().signal,
        "stable-key",
      ),
    ).toEqual({ received: true, requestId: "REQ-123" });
    const args = fetch.mock.calls[0][1];
    expect(args.headers["Idempotency-Key"]).toBe("stable-key");
    expect(JSON.parse(args.body).phone).toBe("+966501234567");
  });
  it("does not turn an HTTP 200 or false acknowledgement into success", async () => {
    for (const body of [
      {},
      { received: false, requestId: "x" },
      { received: true, requestId: " " },
    ]) {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(new Response(JSON.stringify(body))),
      );
      await expect(
        postConsultation(
          valid,
          "/api/consultations",
          new AbortController().signal,
          "key",
        ),
      ).rejects.toThrow();
    }
  });
  it("rejects server failures, unsafe endpoints and transport errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 500 })),
    );
    await expect(
      postConsultation(
        valid,
        "/api/consultations",
        new AbortController().signal,
        "key",
      ),
    ).rejects.toThrow();
    await expect(
      postConsultation(
        valid,
        "http://example.com",
        new AbortController().signal,
        "key",
      ),
    ).rejects.toThrow();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    await expect(
      postConsultation(
        valid,
        "/api/consultations",
        new AbortController().signal,
        "key",
      ),
    ).rejects.toThrow();
  });
});
