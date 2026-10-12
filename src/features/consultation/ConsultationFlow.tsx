import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import { services } from "@/data/services";
import { useConsultation } from "./useConsultation";
import { BookingProgress } from "./components/BookingProgress";
import { ContactStep } from "./components/ContactStep";
import { RequestStep } from "./components/RequestStep";
import { RequestReview } from "./components/RequestReview";
import { ConsultationAside } from "./components/ConsultationAside";

export function ConsultationFlow() {
  const [params] = useSearchParams();
  const selected =
    services.find((s) => s.slug === params.get("service"))?.slug || "";
  const state = useConsultation(selected);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(state.step);
  useEffect(() => {
    if (previousStep.current !== state.step)
      heading.current?.focus({ preventScroll: true });
    previousStep.current = state.step;
  }, [state.step]);
  return (
    <section className="site-container grid items-start gap-10 py-10 lg:grid-cols-[1.35fr_.65fr] lg:gap-16 lg:py-14">
      <div>
        <BookingProgress step={state.step} />
        <h2
          ref={heading}
          tabIndex={-1}
          className="mb-4 text-[28px] focus:outline-none md:text-[31px]"
        >
          {state.step === 1
            ? "كيف نتواصل معك؟"
            : state.step === 2
              ? "ما الذي تحتاج المساعدة فيه؟"
              : "مراجعة الطلب"}
        </h2>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={state.step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {state.step === 3 && state.values ? (
              <RequestReview
                values={state.values}
                sending={state.sending}
                requestId={state.requestId}
                error={state.error}
                send={state.send}
                edit={state.edit}
              />
            ) : (
              <form
                noValidate
                onSubmit={(event) => {
                  if (state.step === 1) {
                    event.preventDefault();
                    void state.next();
                  } else {
                    void state.form.handleSubmit(state.review)(event);
                  }
                }}
                className="space-y-6"
              >
                <p className="mb-6 text-sm text-muted-foreground">
                  {state.step === 1
                    ? "الحقول بعلامة * مطلوبة. بقية التفاصيل يمكن مناقشتها عند التواصل."
                    : "ملخص عام يكفي. لا تضف أرقام هوية أو معلومات حساسة أو تفاصيل مستندات."}
                </p>
                {state.step === 1 ? (
                  <ContactStep form={state.form} />
                ) : (
                  <RequestStep
                    form={state.form}
                    back={() => state.setStep(1)}
                  />
                )}
                <div className="hidden" aria-hidden="true">
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    aria-label="الموقع"
                    {...state.form.register("website")}
                  />
                </div>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ConsultationAside />
    </section>
  );
}
