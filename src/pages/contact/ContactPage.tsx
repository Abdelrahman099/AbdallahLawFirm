import { useTranslate } from "@/i18n/useTranslate";
import { Arrow, ConsultationBand, PageIntro } from "@/components/Brand";
import { OfficeMap, officeMapLink } from "@/components/shared/OfficeMap";
import { office, whatsappUrl } from "@/data/site";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { localContactNumber } from "@/config/contact";

export function Contact() {
  const { tx } = useTranslate();

  const cards = [
    {
      icon: Phone,
      title: "الاتصال بالمكتب",
      value: localContactNumber(office.phone) || "رقم التواصل يُضاف قريبًا",
      href: office.phone ? "tel:" + office.phone : "",
      placeholder: !office.phone,
    },
    {
      icon: WhatsAppIcon,
      title: "واتساب المكتب",
      value: localContactNumber(office.whatsapp) || "رقم واتساب يُضاف قريبًا",
      href: whatsappUrl(
        tx("مرحبًا، أرغب في ترتيب استشارة مع مكتب عبد الله الشهري."),
      ),
      placeholder: !office.whatsapp,
      external: true,
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      value: office.email || "البريد الرسمي يُضاف قريبًا",
      href: office.email ? "mailto:" + office.email : "",
      placeholder: !office.email,
    },
    {
      icon: Clock3,
      title: "أوقات العمل",
      value: office.hours || "تُضاف أوقات العمل بعد اعتمادها",
      href: "",
      placeholder: !office.hours,
    },
  ];
  return (
    <>
      <PageIntro
        tag={tx("تواصل معنا")}
        title={tx("قريبون من احتياجك.")}
        text={tx(
          "مقرنا في جدة، ونقدّم الاستشارات عن بُعد لعملائنا خارج المدينة.",
        )}
      />
      <section className="site-container contact-layout">
        <div>
          <div className="address-block" data-reveal>
            <MapPin size={28} strokeWidth={1.3} />
            <h2>{tx("تفضّل بزيارة المكتب.")}</h2>
            <p>{tx(office.address)}</p>
            <p className="small-note">
              {tx("تُرتّب الزيارة بعد تأكيد الموعد مع المكتب.")}
            </p>
          </div>
          <div className="contact-methods">
            {cards.map((c) => (
              <div key={c.title} data-reveal>
                <c.icon
                  width={22}
                  height={22}
                  strokeWidth={1.3}
                  aria-hidden="true"
                />
                <div>
                  <h3>{tx(c.title)}</h3>
                  {tx(
                    c.href ? (
                      <a
                        href={c.href}
                        dir="ltr"
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noopener noreferrer" : undefined}
                      >
                        {tx(c.value)}
                      </a>
                    ) : (
                      <p className={c.placeholder ? "placeholder-text" : ""}>
                        {tx(c.value)}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <OfficeMap>
          <h3>{tx("مقر المكتب في جدة")}</h3>
          <p>{tx(office.address)}</p>
          <div className="office-map-links">
            <a
              className="text-link"
              href={officeMapLink}
              target="_blank"
              rel="noreferrer"
            >
              {tx("افتح في خرائط Google")}
              <Arrow />
            </a>
          </div>
        </OfficeMap>
      </section>
      <ConsultationBand />
    </>
  );
}
