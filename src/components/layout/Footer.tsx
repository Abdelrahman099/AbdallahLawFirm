import { Logo } from "@/components/Brand";
import { office, whatsappUrl } from "@/data/site";
import { serviceGroups } from "@/data/serviceGroups";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div className="footer-brand">
            <Link to="/">
              <Logo inverse />
            </Link>
            <p>
              مكتب عبد الله الشهري للمحاماة والاستشارات القانونية. خدمات قانونية
              للشركات والمستثمرين والأفراد.
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
          </div>
          <div>
            <h2>مجالات العمل</h2>
            {serviceGroups.map((group) => (
              <Link key={group.id} to={`/services?group=${group.id}`}>
                {group.title}
              </Link>
            ))}
          </div>
          <div>
            <h2>زيارة المكتب</h2>
            <p>{office.address}</p>
            {office.phone ? (
              <a href={"tel:" + office.phone}>
                اتصل بنا
              </a>
            ) : (
              <span className="placeholder-text">
                رقم التواصل — يُضاف قريبًا
              </span>
            )}
            {office.whatsapp && (
              <a
                href={whatsappUrl("مرحبًا، أرغب في الاستفسار عن خدمات المكتب.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                راسلنا عبر واتساب
              </a>
            )}
            {office.email ? (
              <a href={"mailto:" + office.email}>
                أرسل لنا بريدًا
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
    </>
  );
}
