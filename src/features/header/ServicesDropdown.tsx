import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { services } from "@/data/services";
import { serviceGroups } from "@/data/serviceGroups";
import { ServiceIcon } from "@/features/services/ServiceIcon";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./navigation.css";

export function ServicesDropdown() {
  const { tx, dir } = useTranslate();

  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="desktop-services-trigger"
          data-active={location.pathname.startsWith("/services") || undefined}
        >
          {tx("الخدمات")}
          <ChevronDown aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="services-popover"
        sideOffset={12}
        collisionPadding={16}
        aria-label={tx("خدمات المكتب")}
        dir={dir}
      >
        <div className="services-menu-heading">
          <h2>{tx("الخدمات القانونية")}</h2>
          <Link to="/services" onClick={() => setOpen(false)}>
            {tx("استعرض كل الخدمات")}
          </Link>
        </div>
        <div className="services-menu-body">
          {serviceGroups.map((group) => (
              <nav
                key={group.title}
                aria-label={tx(group.title)}
                className="services-menu-group"
                data-group={group.id}
              >
                <h3>
                  <ServiceIcon name={group.icon} />
                  <Link
                    to={`/services?group=${group.id}`}
                    onClick={() => setOpen(false)}
                  >
                    {tx(group.title)}
                  </Link>
                </h3>
                <ul className="services-menu-links">
                  {group.slugs
                      .map((slug) =>
                        services.find((service) => service.slug === slug)!,
                      )
                      .map((service) => (
                        <li key={service.slug}>
                          <Link
                            to={`/services/${service.slug}`}
                            aria-current={
                              location.pathname === `/services/${service.slug}`
                                ? "page"
                                : undefined
                            }
                            onClick={() => setOpen(false)}
                          >
                            <span>{tx(service.title)}</span>
                          </Link>
                        </li>
                      ))}
                </ul>
              </nav>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
