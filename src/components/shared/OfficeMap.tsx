import type { ReactNode } from "react";
import { office } from "@/config/office";
import "./office-map.css";

const place = "برج المستقبل، شارع الأمانة، حي البغدادية، جدة";
const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=16&hl=ar&output=embed`;
export const officeMapLink =
  office.mapUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;

export function OfficeMap({ children }: { children?: ReactNode }) {
  return (
    <div className="office-map" data-reveal>
      <iframe
        className="office-map-frame"
        src={embedUrl}
        title="موقع المكتب على خرائط Google"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {children && <div className="office-map-card">{children}</div>}
    </div>
  );
}
