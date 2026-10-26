import { useTranslate } from "@/i18n/useTranslate";
export function BrandCaption() {
  const { tx } = useTranslate();

  return (
    <div className="intro-caption">
      <h2>{tx("عبد الله الشهري")}</h2>
      <p>{tx("للمحاماة والاستشارات القانونية")}</p>
    </div>
  );
}
