import { useTranslate } from "@/i18n/useTranslate";
export function Logo({
  inverse = false,
  compact = false,
}: {
  inverse?: boolean;
  compact?: boolean;
}) {
  const { tx, language } = useTranslate();

  if (language === "en")
    return (
      <span
        className={`english-brand ${inverse ? "english-brand-inverse" : ""}`}
      >
        <img
          src={`/brand/v4/mark-${inverse ? "beige" : "primary"}.svg`}
          alt=""
          width={1000}
          height={850}
        />
        <span>
          <strong>Abdullah Al Shehri</strong>
          <small>Law Firm &amp; Legal Consultancy</small>
        </span>
      </span>
    );

  return (
    <img
      className="brand-logo"
      src={`/brand/v4/${compact ? "compact" : "horizontal"}-${inverse ? "beige" : "primary"}.svg`}
      alt={tx("عبد الله الشهري للمحاماة والاستشارات القانونية")}
      width={760}
      height={200}
    />
  );
}
