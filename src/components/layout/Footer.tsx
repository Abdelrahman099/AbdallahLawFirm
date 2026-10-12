import { CTA, Logo } from "@/components/Brand";
import { office, services } from "@/data/site";
import { Link, useLocation } from "react-router-dom";
import { useConsultationBarVisibility } from "./useConsultationBarVisibility";

export function Footer() {
  const location = useLocation();
  const showConsultation = useConsultationBarVisibility(location.pathname);
  return (
    <>
      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div className="footer-brand">
            <Link to="/">
              <Logo inverse />
            </Link>
            <p>
              مشورة وتمثيل قانوني للشركات والمستثمرين والأفراد. نبدأ بفهم
              احتياجك، ونتعامل معه بوضوح وعناية.
            </p>
            <span>جدة · المملكة العربية السعودية</span>
          </div>
          <div>
            <h2>استكشف المكتب</h2>
            <Link to="/about">عن المكتب</Link>
            <Link to="/approach">كيف نعمل معك</Link>
            <Link to="/services">الخدمات القانونية</Link>
            <Link to="/insights">إرشادات قبل الاستشارة</Link>
            <Link to="/faq">الأسئلة الشائعة</Link>
            <Link to="/consultation">احجز استشارة</Link>
          </div>
          <div>
            <h2>مجالات العمل</h2>
            {services.slice(0, 4).map((s) => (
              <Link key={s.slug} to={"/services/" + s.slug}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h2>زيارة المكتب</h2>
            <p>{office.address}</p>
            {office.phone ? (
              <a href={"tel:" + office.phone} dir="ltr">
                {office.phone}
              </a>
            ) : (
              <span className="placeholder-text">
                رقم التواصل — يُضاف قريبًا
              </span>
            )}
            {office.email ? (
              <a href={"mailto:" + office.email} dir="ltr">
                {office.email}
              </a>
            ) : (
              <span className="placeholder-text">
                البريد الرسمي — يُضاف قريبًا
              </span>
            )}
          </div>
        </div>
        <div className="site-container footer-bottom">
          <p>
            © {new Date().getFullYear()} {office.name}. جميع الحقوق محفوظة.
          </p>
          <div>
            <Link to="/privacy">الخصوصية</Link>
            <Link to="/terms">شروط الاستخدام</Link>
            <Link to="/contact">تواصل معنا</Link>
          </div>
        </div>
      </footer>
      {location.pathname !== "/consultation" && showConsultation && (
        <div className="mobile-consult">
          <span>ابدأ بخطوة واضحة</span>
          <CTA />
        </div>
      )}
    </>
  );
}
