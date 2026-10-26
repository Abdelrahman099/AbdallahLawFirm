import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { Logo } from "@/components/Brand";
import { office, whatsappUrl } from "@/data/site";
import { serviceGroups } from "@/data/serviceGroups";

export function Footer() {
  const { tx } = useTranslate();

  return (
    <>
      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div className="footer-brand">
            <Link to="/">
              <Logo inverse />
            </Link>
            <p>
              {tx(
                "مكتب عبد الله الشهري للمحاماة والاستشارات القانونية. خدمات قانونية للشركات والمستثمرين والأفراد.",
              )}
            </p>
            <span>{tx("جدة · المملكة العربية السعودية")}</span>
          </div>
          <div>
            <h2>{tx("استكشف المكتب")}</h2>
            <Link to="/about">{tx("عن المكتب")}</Link>
            <Link to="/approach">{tx("كيف نعمل معك")}</Link>
            <Link to="/services">{tx("الخدمات القانونية")}</Link>
            <Link to="/insights">{tx("إرشادات قبل الاستشارة")}</Link>
            <Link to="/faq">{tx("الأسئلة الشائعة")}</Link>
          </div>
          <div>
            <h2>{tx("مجالات العمل")}</h2>
            {serviceGroups.map((group) => (
              <Link key={group.id} to={`/services?group=${group.id}`}>
                {tx(group.title)}
              </Link>
            ))}
          </div>
          <div>
            <h2>{tx("زيارة المكتب")}</h2>
            <p>{tx(office.address)}</p>
            {tx(
              office.phone ? (
                <a href={"tel:" + office.phone}>{tx("اتصل بنا")}</a>
              ) : (
                <span className="placeholder-text">
                  {tx("رقم التواصل — يُضاف قريبًا")}
                </span>
              ),
            )}
            {tx(
              office.whatsapp && (
                <a
                  href={whatsappUrl(
                    tx("مرحبًا، أرغب في الاستفسار عن خدمات المكتب."),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tx("راسلنا عبر واتساب")}
                </a>
              ),
            )}
            {tx(
              office.email ? (
                <a href={"mailto:" + office.email}>{tx("أرسل لنا بريدًا")}</a>
              ) : (
                <span className="placeholder-text">
                  {tx("البريد الرسمي — يُضاف قريبًا")}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="site-container footer-bottom">
          <p>
            © {tx(new Date().getFullYear())} {tx(office.name)}
            {tx(". جميع الحقوق محفوظة.")}
          </p>
          <div>
            <Link to="/privacy">{tx("الخصوصية")}</Link>
            <Link to="/terms">{tx("شروط الاستخدام")}</Link>
            <Link to="/contact">{tx("تواصل معنا")}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
