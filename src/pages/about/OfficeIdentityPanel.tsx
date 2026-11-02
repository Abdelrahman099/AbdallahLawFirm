import { useTranslate } from "@/i18n/useTranslate";
import { office } from "@/config/office";
import "./office-identity.css";

export function OfficeIdentityPanel() {
  const { tx } = useTranslate();

  return (
    <figure className="office-identity-panel" data-reveal>
      <div className="office-identity-meta">
        <span>{tx(office.city)}</span>
        <span>{tx("منذ 2015")}</span>
      </div>
      <div className="office-identity-emblem" aria-hidden="true">
        <img
          src="/brand/v4/mark-beige.svg"
          alt=""
          width="240"
          height="204"
        />
      </div>
      <figcaption className="office-identity-signature">
        <p className="office-identity-role">{tx("المحامي المؤسس")}</p>
        <h2>{tx(office.name)}</h2>
        <p className="office-identity-descriptor">{tx(office.descriptor)}</p>
      </figcaption>
    </figure>
  );
}
