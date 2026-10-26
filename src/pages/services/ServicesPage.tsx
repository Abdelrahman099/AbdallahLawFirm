import { useTranslate } from "@/i18n/useTranslate";
import { ConsultationBand } from "@/components/Brand";
import { ServiceDirectory } from "@/features/services/directory/ServiceDirectory";
import { useFilterStyle } from "@/features/services/directory/filterStyles";
import {
  useServiceDirectory,
  useUrlFilters,
} from "@/features/services/directory/useServiceDirectory";

export function Services() {
  const { tx } = useTranslate();

  const dir = useServiceDirectory(useUrlFilters());
  const variant = useFilterStyle();
  return (
    <>
      <section className="site-container practice-directory-heading">
        <div>
          <p className="eyebrow">{tx("مجالات العمل")}</p>
          <h1 tabIndex={-1}>{tx("الخدمات القانونية")}</h1>
          <p className="intro-text">
            {tx(
              "اختر موضوعك لتعرف نطاق الخدمة والمعلومات التي تحتاجها قبل الاستشارة.",
            )}
          </p>
        </div>
        <p>
          {tx("للشركات والمستثمرين والأفراد.")}
          <br />
          {tx("بالمكتب أو عن بُعد.")}
        </p>
      </section>
      <ServiceDirectory dir={dir} variant={variant} />
      <ConsultationBand />
    </>
  );
}
