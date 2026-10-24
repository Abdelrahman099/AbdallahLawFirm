import { office } from "@/config/office";

export const serviceSlides = [
  {
    label: "الشركات والاستثمار",
    title: "لأعمالك رؤية.",
    accent: "ولقراراتك سند.",
    description: "تأسيس الشركات والمشورة القانونية لأعمالك.",
    image: "/images/brand-company-v2.webp",
    alt: "نموذج شركة ومستندات تأسيس، مشهد تصوري بألوان المكتب",
    cta: "استكشف تأسيس الشركات",
    link: "/services/company-formation",
  },
  {
    label: "العقود والتوثيق",
    title: "كل بند له أثر.",
    accent: "نعتني بالتفاصيل.",
    description: "عقود واضحة، وتوثيق يعتني بتفاصيل تعاملاتك.",
    image: "/images/brand-contracts-v2.webp",
    alt: "عقد داخل ملف قانوني وقلم للمراجعة",
    cta: "استكشف خدمة العقود",
    link: "/services?group=agreements",
  },
  {
    label: "التقاضي والتمثيل القانوني",
    title: "نفهم موقفك.",
    accent: "ونرتّب خطوتك.",
    description: "دراسة موضوعك وتمثيلك أمام الجهات المختصة.",
    image: "/images/brand-litigation-v2.webp",
    alt: "قاعة قضائية تصورية بألوان الهوية",
    cta: "استكشف التقاضي والمنازعات",
    link: "/services/litigation",
  },
] as const;

export const welcomeSlide = {
  kind: "welcome",
  label: "أهلًا بكم",
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
