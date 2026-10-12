import type { ComponentProps } from "react";

export const brandImagery = {
  company: {
    name: "brand-company-v2",
    alt: "نموذج مقر شركة مع مستندات تأسيس، مشهد تصوري",
  },
  investment: {
    name: "brand-investment-v2",
    alt: "كرة أرضية برونزية وملف استثمار أمام ميناء تجاري تصوري",
  },
  contractReview: {
    name: "brand-contracts-v2",
    alt: "مراجعة اتفاقية وقلم توقيع، مشهد تصوري",
  },
  litigation: {
    name: "brand-litigation-v2",
    alt: "قاعة قضائية تصورية خالية بالأخضر والخشب والعاجي",
  },
  arbitration: {
    name: "brand-arbitration-v2",
    alt: "طاولة حوار مستديرة وملفان متقابلان للتحكيم",
  },
  labor: {
    name: "brand-labor-v2",
    alt: "حقيبة عمل ومستند علاقة عمل وبطاقة موظف بلا بيانات",
  },
  property: {
    name: "brand-property-v2",
    alt: "نموذج منزل ومفتاح ومخطط عقاري، مشهد تصوري",
  },
  family: {
    name: "brand-family-v2",
    alt: "صندوق أرشيف عائلي ومستندات محفوظة ومفتاح تراثي",
  },
  prepareGuide: {
    name: "brand-article-prepare-v2",
    alt: "دفتر لتجهيز الأسئلة قبل الاستشارة",
  },
  businessGuide: {
    name: "brand-article-business-v2",
    alt: "تكوين تخطيط قرار أعمال من نماذج معمارية مترابطة",
  },
  organizeGuide: {
    name: "brand-article-organize-v2",
    alt: "أدراج فرز وملفات لتنظيم المستندات",
  },
  justice: {
    name: "brand-justice-v1",
    alt: "ميزان العدالة البرونزي مع ملف قانوني",
  },
  contracts: {
    name: "brand-contracts-v1",
    alt: "مستند عقد داخل ملف أخضر وقلم للمراجعة والتوقيع",
  },
  consultation: {
    name: "brand-consultation-v1",
    alt: "دفتر وملف على طاولة استشارة قانونية، مشهد تصوري",
  },
  preparation: {
    name: "brand-preparation-v1",
    alt: "أوراق مصنفة وقائمة تحضير داخل ملف قانوني",
  },
} as const;
export type BrandImageName = keyof typeof brandImagery;
export function brandVisual(asset: BrandImageName) {
  const image = brandImagery[asset];
  return {
    src: `/images/${image.name}.webp`,
    mobile: `/images/${image.name}-mobile.webp`,
    alt: image.alt,
  };
}
export function BrandImage({
  asset,
  sizes = "(max-width: 700px) 100vw, 50vw",
  ...props
}: ComponentProps<"img"> & { asset: BrandImageName }) {
  const photo = brandVisual(asset);
  return (
    <img
      src={photo.src}
      srcSet={`${photo.mobile} 720w, ${photo.src} 1254w`}
      sizes={sizes}
      alt={photo.alt}
      width={1254}
      height={1254}
      loading="lazy"
      {...props}
    />
  );
}
