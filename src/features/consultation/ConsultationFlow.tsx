import { SimpleConsultationForm } from "./SimpleConsultationForm";
export function ConsultationFlow() {
  return (
    <section className="site-container pb-20">
      <div className="mx-auto max-w-2xl border border-border bg-card p-5 md:p-10">
        <SimpleConsultationForm />
      </div>
    </section>
  );
}
