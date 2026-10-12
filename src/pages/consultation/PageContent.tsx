import { PageIntro } from "@/components/shared/PageIntro";
import { ConsultationFlow } from "@/features/consultation/ConsultationFlow";
export default function ConsultationPage() {
  return (
    <>
      <PageIntro
        tag="احجز استشارة"
        title="خلّينا نفهم احتياجك."
        text="ابدأ ببيانات بسيطة، ثم اختر موضوع الاستشارة. يتواصل المكتب معك لترتيب الموعد وتأكيده."
      />
      <ConsultationFlow />
    </>
  );
}
