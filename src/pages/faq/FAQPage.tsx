import { useTranslate } from "@/i18n/useTranslate";
import { CTA, ConsultationBand, Dots, PageIntro } from "@/components/Brand";
import { FAQ } from "@/features/faq/FAQAccordion";

export function FAQPage() {
  const { tx } = useTranslate();

  return (
    <>
      <PageIntro
        tag={tx("الأسئلة الشائعة")}
        title={tx("كل بداية، معها أسئلة.")}
        text={tx("إجابات مختصرة تساعدك على فهم الخدمة وطريقة ترتيب الاستشارة.")}
      />
      <section className="site-container faq-page">
        <FAQ />
        <div className="question-aside">
          <Dots />
          <h2>{tx("موضوعك مختلف؟")}</h2>
          <p>{tx("صف احتياجك بصورة عامة، وسنحدّد معك البداية المناسبة.")}</p>
          <CTA />
        </div>
      </section>
      <ConsultationBand />
    </>
  );
}
