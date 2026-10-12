import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { office } from "@/config/office";
import { consultationSchema, defaultValues } from "./schema";
import type { ConsultationValues } from "./schema";
import { postConsultation } from "./api";

export function useConsultation(selectedService: string) {
  const form = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { ...defaultValues, service: selectedService },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [values, setValues] = useState<ConsultationValues | null>(null);
  const [sending, setSending] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const alive = useRef(true);
  const requestKey = useRef("");
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      abortRef.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (selectedService) form.setValue("service", selectedService);
  }, [selectedService, form]);
  async function next() {
    if (await form.trigger(["name", "phone", "email"], { shouldFocus: true }))
      setStep(2);
  }
  function review(data: ConsultationValues) {
    setValues(data);
    setStep(3);
    setError("");
    requestKey.current = crypto.randomUUID();
  }
  function edit() {
    if (!sending) {
      setStep(2);
      setError("");
    }
  }
  async function send() {
    if (!values || !office.endpoint || sending || requestId) return;
    setSending(true);
    setError("");
    const abort = new AbortController();
    abortRef.current = abort;
    const timeout = setTimeout(() => abort.abort(), 20000);
    try {
      const receipt = await postConsultation(
        values,
        office.endpoint,
        abort.signal,
        requestKey.current,
      );
      if (alive.current) setRequestId(receipt.requestId);
    } catch {
      if (alive.current)
        setError(
          "تعذّر تأكيد وصول الطلب للمكتب. بياناتك ما زالت هنا؛ أعد المحاولة أو استخدم وسيلة التواصل المتاحة.",
        );
    } finally {
      clearTimeout(timeout);
      abortRef.current = null;
      if (alive.current) setSending(false);
    }
  }
  return {
    form,
    step,
    setStep,
    values,
    next,
    review,
    edit,
    send,
    sending,
    requestId,
    error,
  };
}
