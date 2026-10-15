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
      src={`/brand/v4/${compact ? "compact" : "horizontal"}-${inverse ? "beige" : "primary"}.svg`}
      alt="عبد الله الشهري للمحاماة والاستشارات القانونية"
      width={760}
      height={200}
    />
  );
}
