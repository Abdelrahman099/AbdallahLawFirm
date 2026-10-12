import { CTA } from "@/components/Brand";

export function NotFound() {
  return (
    <section className="site-container not-found">
      <span className="error-number" dir="ltr">
        404
      </span>
      <h1 tabIndex={-1}>هذه الصفحة غير موجودة.</h1>
      <p>يمكنك الرجوع للرئيسية أو استعراض خدمات المكتب.</p>
      <div>
        <CTA to="/">الرئيسية</CTA>
        <CTA to="/services" secondary>
          الخدمات
        </CTA>
      </div>
    </section>
  );
}
