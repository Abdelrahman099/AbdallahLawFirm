import { useTranslate } from "@/i18n/useTranslate";
import { PageIntro } from "@/components/shared/PageIntro";
import { ConsultationFlow } from "@/features/consultation/ConsultationFlow";
export default function ConsultationPage() {
  const { tx } = useTranslate();

  return (
    <>
      <PageIntro
        tag={tx("احجز استشارة")}
        title={tx("خلّينا نفهم احتياجك.")}
        text={tx(
          "أدخل بياناتك وأرسل رسالتك مباشرة عبر واتساب أو البريد. يتواصل المكتب معك لترتيب الموعد.",
        )}
      />
      <ConsultationFlow />
    </>
  );
}
