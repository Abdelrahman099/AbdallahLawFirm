import { office } from "@/config/office";

export const serviceSlides = [
  {
    label: "الشركات والاستثمار الأجنبي",
    title: "إصدار تراخيص",
    accent: "الاستثمار الأجنبي",
    description: "تأسيس الشركات والاستشارات القانونية لأعمالك",
    image: "/images/brand-company-v2.webp",
    alt: "نموذج شركة ومستندات تأسيس، مشهد تصوري بألوان المكتب",
    cta: "استكشف تأسيس الشركات",
    link: "/services/company-formation",
  },
  {
    label: "التقاضي والتمثيل القانوني",
    title: "التقاضي",
    accent: "والتمثيل القانوني",
    description: "دراسة موضوعك وتمثيلك أمام الجهات المختصة.",
    image: "/images/brand-litigation-v2.webp",
    alt: "قاعة قضائية تصورية بألوان الهوية",
    cta: "استكشف التقاضي والمنازعات",
    link: "/services/litigation",
  },
  {
    label: "العقود والتوثيق",
    title: "العقود",
    accent: "والتوثيق",
    description: "صياغة ومراجعة العقود، وتوثيق الوكالات والخدمات العقارية.",
    image: "/images/brand-contracts-v2.webp",
    alt: "عقد داخل ملف قانوني وقلم للمراجعة",
    cta: "استكشف خدمة العقود",
    link: "/services?group=agreements",
  },
] as const;

export const welcomeSlide = {
  kind: "welcome",
  image: "/images/brand-welcome-justice-v1.webp",
  alt: "ميزان عدالة برونزي وكتب قانونية بألوان هوية المكتب، مشهد تصوري",
  label: "المكتب",
  title: office.name,
  descriptor: office.descriptor,
  description: "نستمع إليك، ونعتني بخطوتك القانونية.",
  cta: "تعرّف على المكتب",
  link: "/about",
} as const;

export const heroSlides = [
  welcomeSlide,
  ...serviceSlides.map((slide) => ({ ...slide, kind: "service" as const })),
] as const;

export type HeroSlide = (typeof heroSlides)[number];
