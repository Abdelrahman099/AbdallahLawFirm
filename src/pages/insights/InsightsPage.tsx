import { useTranslate } from "@/i18n/useTranslate";
import { ConsultationBand, PageIntro } from "@/components/Brand";
import { ArticleCards } from "@/features/insights/ArticleCards";
export function Insights() {
  const { tx } = useTranslate();

  return (
    <>
      <PageIntro
        tag={tx("إرشادات عملية")}
        title={tx("معلومات مرتّبة، واستشارة أوضح.")}
        text={tx(
          "محتوى تعريفي يساعدك على التحضير للتواصل مع المكتب؛ لا يغني عن دراسة حالتك بصورة خاصة.",
        )}
      />
      <section className="site-container insights-page">
        <ArticleCards />
      </section>
      <ConsultationBand />
    </>
  );
}
