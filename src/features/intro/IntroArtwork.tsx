import { LineIntro } from "./LineIntro";
import { PointsIntro } from "./PointsIntro";
import { FolioIntro } from "./FolioIntro";
import { SealIntro } from "./SealIntro";
import { TypeIntro } from "./TypeIntro";
import type { IntroId } from "./variants";
import { BalanceIntro } from "./balance/BalanceIntro";
import { isBalanceIntro } from "./balance/variants";
import "./intro-art.css";
import { LogoIntro } from "./logo/LogoIntro";
import { isLogoIntro } from "./logo/variants";
const designs = {
  draw: LineIntro,
  points: PointsIntro,
  folio: FolioIntro,
  seal: SealIntro,
  type: TypeIntro,
};
export function IntroArtwork({
  variant,
  still = false,
}: {
  variant: IntroId;
  still?: boolean;
}) {
  if (isLogoIntro(variant) || variant === "balance-onyx") {
    return (
      <div className={`intro-artwork intro-artwork-${variant}`}>
        <LogoIntro
          variant={isLogoIntro(variant) ? variant : "logo-balance"}
          still={still}
        />
      </div>
    );
  }
  const balance = isBalanceIntro(variant);
  const Design = balance ? null : designs[variant];
  return (
    <div className={`intro-artwork intro-artwork-${variant}`}>
      {balance ? <BalanceIntro variant={variant} /> : Design && <Design />}
    </div>
  );
}
