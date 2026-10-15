import { ConsultationBand } from "@/components/Brand";
import { ServiceDirectory } from "@/features/services/directory/ServiceDirectory";
import { useFilterStyle } from "@/features/services/directory/filterStyles";
import {
  useServiceDirectory,
  useUrlFilters,
} from "@/features/services/directory/useServiceDirectory";

export function Services() {
  const dir = useServiceDirectory(useUrlFilters());
  const variant = useFilterStyle();
  return (
    <>
      <section className="site-container practice-directory-heading">
        <div>
          <p className="eyebrow">مجالات العمل</p>
          <h1 tabIndex={-1}>الخدمات القانونية</h1>
          <p className="intro-text">
            اختر موضوعك لتعرف نطاق الخدمة والمعلومات التي تحتاجها قبل الاستشارة.
          </p>
        </div>
        <p>
          للشركات والمستثمرين والأفراد.
          <br />
          بالمكتب أو عن بُعد.
        </p>
      </section>
      <ServiceDirectory dir={dir} variant={variant} />
      <ConsultationBand />
    </>
  );
}
