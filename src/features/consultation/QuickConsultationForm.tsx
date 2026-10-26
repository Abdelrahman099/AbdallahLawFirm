import { useTranslate } from "@/i18n/useTranslate";
import { SimpleConsultationForm } from "./SimpleConsultationForm";
export function QuickConsultationForm() {
  const { tx } = useTranslate();

  return (
    <div className="home-contact-form">
      <h3 className="home-contact-form-heading">{tx("تواصل معنا مباشرة.")}</h3>
      <SimpleConsultationForm />
    </div>
  );
}
