import { LineIntro } from "./LineIntro";
import { PointsIntro } from "./PointsIntro";
import { FolioIntro } from "./FolioIntro";
import { SealIntro } from "./SealIntro";
import { TypeIntro } from "./TypeIntro";
import type { IntroId } from "./variants";
import { BalanceIntro } from "./balance/BalanceIntro";
import { isBalanceIntro } from "./balance/variants";
import "./intro-art.css";
const designs = {
  draw: LineIntro,
  points: PointsIntro,
  folio: FolioIntro,
  seal: SealIntro,
  type: TypeIntro,
};
export function IntroArtwork({ variant }: { variant: IntroId }) {
  const balance = isBalanceIntro(variant);
  const Design = balance ? null : designs[variant];
  return (
    <div className={`intro-artwork intro-artwork-${variant}`}>
      {balance ? <BalanceIntro variant={variant} /> : Design && <Design />}
    </div>
  );
}
