import { useTranslate } from "@/i18n/useTranslate";
export function MobileBrandLogo({ inverse = false }: { inverse?: boolean }) {
  const { tx } = useTranslate();

  return (
    <span className="mobile-brand-lockup">
      <img
        src={`/brand/v4/mark-${inverse ? "beige" : "primary"}.svg`}
        alt=""
        width={1000}
        height={850}
      />
      <span>{tx("عبد الله الشهري")}</span>
    </span>
  );
}
