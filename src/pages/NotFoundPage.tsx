import { useTranslate } from "@/i18n/useTranslate";
import { CTA } from "@/components/Brand";

export function NotFound() {
  const { tx } = useTranslate();

  return (
    <section className="site-container not-found">
      <span className="error-number" dir="ltr">
        404
      </span>
      <h1 tabIndex={-1}>{tx("هذه الصفحة غير موجودة.")}</h1>
      <p>{tx("يمكنك الرجوع للرئيسية أو استعراض خدمات المكتب.")}</p>
      <div>
        <CTA to="/">{tx("الرئيسية")}</CTA>
        <CTA to="/services" secondary>
          {tx("الخدمات")}
        </CTA>
      </div>
    </section>
  );
}
