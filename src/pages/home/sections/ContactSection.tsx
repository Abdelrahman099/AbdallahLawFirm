import { useTranslate } from "@/i18n/useTranslate";
import { MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OfficeMap, officeMapLink } from "@/components/shared/OfficeMap";
import { office } from "@/config/office";
import { QuickConsultationForm } from "@/features/consultation/QuickConsultationForm";
import "./contact-section.css";

export function ContactSection() {
  const { tx } = useTranslate();

  return (
    <section
      id="home-contact"
      className="home-contact"
      aria-labelledby="home-contact-heading"
    >
      <div className="site-container">
        <div className="home-contact-heading">
          <p className="eyebrow">{tx("على تواصل")}</p>
          <h2 id="home-contact-heading">{tx("تواصل مع المكتب.")}</h2>
          <p>{tx("نستقبلك في مكتبنا، أو نرتب معك استشارة عن بُعد.")}</p>
        </div>
        <div className="home-contact-grid">
          <QuickConsultationForm />
          <div className="home-contact-location">
            <OfficeMap />
            <div className="home-contact-address">
              <div>
                <MapPin aria-hidden="true" size={21} />
                <h3>{tx("مقر المكتب")}</h3>
              </div>
              <address>{tx(office.address)}</address>
              <a href={`mailto:${office.email}`} className="home-contact-email">
                <Mail size={17} aria-hidden="true" />
                <span dir="ltr">{tx(office.email)}</span>
              </a>
              <Button
                variant="outline"
                asChild
                className="h-12 bg-transparent text-inherit hover:bg-white/10 hover:text-inherit"
              >
                <a href={officeMapLink} target="_blank" rel="noreferrer">
                  {tx("افتح الموقع في خرائط Google")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
