import { useTranslate } from "@/i18n/useTranslate";
import { Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { office, whatsappUrl } from "@/config/office";
import "./contact-actions.css";

export function ContactActions() {
  const { tx } = useTranslate();

  const { pathname } = useLocation();
  if (pathname.includes("/design-lab")) return null;
  return (
    <>
      <div className="contact-actions-space" aria-hidden="true" />
      <nav className="contact-actions" aria-label={tx("تواصل مباشر مع المكتب")}>
        <a
          className="contact-direct"
          href={`tel:${office.phone}`}
          aria-label={tx("اتصل بنا")}
          title={tx("اتصل بنا")}
        >
          <Phone aria-hidden="true" />
        </a>
        <a
          className="contact-direct"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tx("راسلنا عبر واتساب")}
          title={tx("راسلنا عبر واتساب")}
        >
          <WhatsAppIcon />
        </a>
      </nav>
    </>
  );
}
