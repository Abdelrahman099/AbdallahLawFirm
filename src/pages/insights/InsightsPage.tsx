import { ConsultationBand, PageIntro } from "@/components/Brand";
import { ArticleCards } from "@/features/insights/ArticleCards";
export function Insights() {
  return (
    <>
      <PageIntro
        tag="إرشادات عملية"
        title="معلومات مرتّبة، واستشارة أوضح."
        text="محتوى تعريفي يساعدك على التحضير للتواصل مع المكتب؛ لا يغني عن دراسة حالتك بصورة خاصة."
      />
      <section className="site-container insights-page">
        <ArticleCards />
      </section>
      <ConsultationBand />
    </>
  );
}
