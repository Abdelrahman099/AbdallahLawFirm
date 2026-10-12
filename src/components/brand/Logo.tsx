export function Logo({
  inverse = false,
  compact = false,
}: {
  inverse?: boolean;
  compact?: boolean;
}) {
  return (
    <img
      className="brand-logo"
      src={`/brand/${compact ? "compact" : "horizontal"}-${inverse ? "reverse" : "primary"}.svg`}
      alt="عبد الله الشهري للمحاماة والاستشارات القانونية"
      width={compact ? 760 : 860}
      height={compact ? 200 : 230}
    />
  );
}
