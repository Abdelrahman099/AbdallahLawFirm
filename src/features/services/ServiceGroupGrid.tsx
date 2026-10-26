import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";

import { serviceGroups } from "@/data/serviceGroups";
import { services } from "@/data/services";
import { BrandImage } from "@/components/brand/BrandImage";
import { ServiceIcon } from "./ServiceIcon";
import "./service-groups.css";

export function ServiceGroupGrid() {
  const { tx, t } = useTranslate();

  return (
    <div className="service-group-grid">
      {serviceGroups.map((group) => (
          <article
            className="service-group-card"
            key={group.id}
            id={`group-${group.id}`}
          >
            <Link
              className="service-group-cover"
              to={`/services?group=${group.id}`}
              aria-label={tx(t("استعرض خدمات {{v0}}", { v0: tx(group.title) }))}
            >
              <BrandImage
                asset={group.image}
                sizes="(max-width: 760px) 100vw, 33vw"
              />
              <span className="service-group-icon" aria-hidden="true">
                <ServiceIcon name={group.icon} />
              </span>
            </Link>
            <div className="service-group-content">
              <h3>
                <Link to={`/services?group=${group.id}`}>
                  {tx(group.title)}
                </Link>
              </h3>
              <p>{tx(group.summary)}</p>
              <ul>
                {group.slugs.map((slug) => {
                    const service = services.find(
                      (item) => item.slug === slug,
                    )!;
                    return (
                      <li key={slug}>
                        <Link to={`/services/${slug}`}>
                          {tx(service.title)}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </article>
        ))}
    </div>
  );
}
