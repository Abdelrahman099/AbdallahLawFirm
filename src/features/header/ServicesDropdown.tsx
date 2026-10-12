import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { services } from "@/data/services";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navigation.css";
import { BrandImage } from "@/components/brand/BrandImage";

export function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  const groups = [
    {
      title: "للأعمال والاستثمار",
      items: services.filter((s) => s.audience === "business"),
    },
    {
      title: "للأفراد والمنشآت",
      items: services.filter((s) => s.audience !== "business"),
    },
  ];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="desktop-services-trigger"
          data-active={location.pathname.startsWith("/services") || undefined}
        >
          الخدمات <ChevronDown aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="services-popover"
        sideOffset={24}
        collisionPadding={24}
        aria-label="خدمات المكتب"
        dir="rtl"
      >
        <div className="services-menu-heading">
          <div>
            <span>الخدمات القانونية</span>
            <h2>ابدأ من موضوعك.</h2>
          </div>
          <Link to="/services" onClick={() => setOpen(false)}>
            استعرض كل الخدمات
          </Link>
        </div>
        <div className="services-menu-body">
          <figure className="services-menu-photo">
            <BrandImage asset="justice" sizes="250px" loading="eager" />
            <figcaption>
              مشورة قبل القرار.
              <br />
              ومتابعة بعده.
            </figcaption>
          </figure>
          {groups.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="services-menu-group"
            >
              <h3>{group.title}</h3>
              {group.items.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  onClick={() => setOpen(false)}
                >
                  <span>{service.title}</span>
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
