import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { Arrow } from "@/components/Brand";
import type { Service } from "@/data/site";
import { services } from "@/data/site";
import { ServiceIcon } from "@/features/services/ServiceIcon";

export function ServiceList({ items = services }: { items?: Service[] }) {
  const { tx } = useTranslate();

  return (
    <div className="service-list">
      {items.map((s) => (
        <Link
          className="service-row"
          to={"/services/" + s.slug}
          key={s.slug}
          data-reveal
        >
          <span className="service-number" dir="ltr">
            {tx(s.number)}
          </span>
          <span className="service-icon">
            <ServiceIcon name={s.icon} />
          </span>
          <div>
            <h3>{tx(s.title)}</h3>
            <p>{tx(s.short)}</p>
          </div>
          <span className="row-arrow">
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
