export function MobileBrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="mobile-brand-lockup">
      <img
        src={`/brand/v4/mark-${inverse ? "beige" : "primary"}.svg`}
        alt=""
        width={1000}
        height={850}
      />
      <span>عبد الله الشهري</span>
    </span>
  );
}
