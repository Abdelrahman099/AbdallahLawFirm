import { useTranslate } from "@/i18n/useTranslate";
export function Courthouse({ small = false }: { small?: boolean }) {
  const { tx } = useTranslate();

  return (
    <div
      className={`court-art ${small ? "court-art-small" : ""}`}
      aria-hidden="true"
    >
      <div className="court-grid" />
      <div className="court-arch">
        <div className="arch-inner" />
        <div className="arch-inner arch-inner-two" />
      </div>
      <div className="court-columns">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="court-emblem">
        <img src="/brand/v4/mark-beige.svg" alt="" width="240" height="204" />
      </div>
      <div className="court-floor">
        <i />
        <i />
        <i />
      </div>
      <span className="court-coordinate">{tx("اتزان · وضوح · عناية")}</span>
      <span className="court-corner">
        {tx("جدة")}
        <br />
        <b dir="ltr">2015</b>
      </span>
    </div>
  );
}
