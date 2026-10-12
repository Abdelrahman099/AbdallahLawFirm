import { Arrow } from "@/components/Brand";
import type { Service } from "@/data/site";
import { services } from "@/data/site";
import { ServiceIcon } from "@/features/services/ServiceIcon";
import { Link } from "react-router-dom";
export function ServiceList({ items = services }: { items?: Service[] }) {
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
            {s.number}
          </span>
          <span className="service-icon">
            <ServiceIcon name={s.icon} />
          </span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.short}</p>
          </div>
          <span className="row-arrow">
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
