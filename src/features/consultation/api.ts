import type { ConsultationValues } from "./schema";
import { normalizePhone } from "./schema";

export type Receipt = { received: true; requestId: string };
export async function postConsultation(
  values: ConsultationValues,
  endpoint: string,
  signal: AbortSignal,
  idempotencyKey: string,
): Promise<Receipt> {
  if (!endpoint.startsWith("/api/") && !/^https:\/\//.test(endpoint))
    throw new Error("Unavailable endpoint");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      ...values,
      phone: normalizePhone(values.phone),
      source: "website",
      consentVersion: "draft-1",
    }),
    signal,
  });
  if (!response.ok) throw new Error("Request rejected");
  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== "object" ||
    !("received" in result) ||
    result.received !== true ||
    !("requestId" in result) ||
    typeof result.requestId !== "string" ||
    !result.requestId.trim()
  )
    throw new Error("No storage acknowledgement");
  return { received: true, requestId: result.requestId.slice(0, 100) };
}
