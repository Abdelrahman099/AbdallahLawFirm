import { Arrow, ConsultationBand, PageIntro } from "@/components/Brand";
import { OfficeMap, officeMapLink } from "@/components/shared/OfficeMap";
import { office, whatsappUrl } from "@/data/site";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const cards = [
    {
      icon: Phone,
      title: "الهاتف والواتساب",
      value: office.phone || "رقم التواصل يُضاف قريبًا",
      href: office.phone ? "tel:" + office.phone : "",
      placeholder: !office.phone,
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
        tag="تواصل معنا"
        title="قريبون من احتياجك."
        text="مقرنا في جدة، ونقدّم الاستشارات عن بُعد لعملائنا خارج المدينة."
      />
      <section className="site-container contact-layout">
        <div>
          <div className="address-block" data-reveal>
            <MapPin size={28} strokeWidth={1.3} />
            <h2>تفضّل بزيارة المكتب.</h2>
            <p>{office.address}</p>
            <p className="small-note">
              تُرتّب الزيارة بعد تأكيد الموعد مع المكتب.
            </p>
          </div>
          <div className="contact-methods">
            {cards.map((c) => (
              <div key={c.title} data-reveal>
                <c.icon size={22} strokeWidth={1.3} />
                <div>
                  <h3>{c.title}</h3>
                  {c.href ? (
                    <a href={c.href} dir="ltr">
                      {c.value}
                    </a>
                  ) : (
                    <p className={c.placeholder ? "placeholder-text" : ""}>
                      {c.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {office.phone && (
            <a
              href={whatsappUrl(
                "مرحبًا، أرغب في ترتيب استشارة مع مكتب عبد الله الشهري.",
              )}
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              تواصل عبر واتساب <Arrow />
            </a>
          )}
        </div>
        <OfficeMap>
          <h3>مقر المكتب في جدة</h3>
          <p>{office.address}</p>
          <div className="office-map-links">
            <a
              className="text-link"
              href={officeMapLink}
              target="_blank"
              rel="noreferrer"
            >
              افتح في خرائط Google <Arrow />
            </a>
          </div>
        </OfficeMap>
      </section>
      <ConsultationBand />
    </>
  );
}
