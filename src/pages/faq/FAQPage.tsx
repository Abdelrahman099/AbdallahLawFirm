import { CTA, ConsultationBand, Dots, PageIntro } from "@/components/Brand";
import { FAQ } from "@/features/faq/FAQAccordion";

export function FAQPage() {
  return (
    <>
      <PageIntro
        tag="الأسئلة الشائعة"
        title="كل بداية، معها أسئلة."
        text="إجابات مختصرة تساعدك على فهم الخدمة وطريقة ترتيب الاستشارة."
      />
      <section className="site-container faq-page">
        <FAQ />
        <div className="question-aside">
          <Dots />
          <h2>موضوعك مختلف؟</h2>
          <p>صف احتياجك بصورة عامة، وسنحدّد معك البداية المناسبة.</p>
          <CTA />
        </div>
      </section>
      <ConsultationBand />
    </>
  );
}
