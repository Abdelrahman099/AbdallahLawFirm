export function MobileBrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="mobile-brand-lockup">
      <svg
        viewBox="16 20 208 172"
        aria-hidden="true"
        focusable="false"
        width={208}
        height={172}
      >
        <image
          href={`/brand/mark-${inverse ? "reverse" : "primary"}.svg`}
          width={240}
          height={220}
        />
      </svg>
      <span>عبد الله الشهري</span>
    </span>
  );
}
