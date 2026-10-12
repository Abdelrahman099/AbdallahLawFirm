import { Arrow, ConsultationBand, PageIntro } from "@/components/Brand";
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
        <div className="map-placeholder" data-reveal>
          <div className="map-streets" />
          <div className="map-pin">
            <MapPin size={40} strokeWidth={1.3} />
            <span>جدة · حي البغدادية</span>
          </div>
          <div className="map-caption">
            <h3>برج المستقبل</h3>
            {office.mapUrl ? (
              <a
                className="text-link"
                href={office.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                افتح الخريطة <Arrow />
              </a>
            ) : (
              <p>رابط الخريطة التفصيلي يُضاف قريبًا</p>
            )}
          </div>
        </div>
      </section>
      <ConsultationBand />
    </>
  );
}
