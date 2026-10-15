import type { BrandImageName } from "@/components/brand/BrandImage";

export type ServiceGroup = {
  id: string;
  title: string;
  summary: string;
  image: BrandImageName;
  icon: "building" | "scale" | "file";
  slugs: string[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "business",
    title: "الشركات والاستثمار",
    summary: "تأسيس الأعمال وتنظيم علاقاتها القانونية.",
    image: "company",
    icon: "building",
    slugs: ["company-formation", "contracts", "foreign-investment"],
  },
  {
    id: "litigation",
    title: "التقاضي والتمثيل القانوني",
    summary: "الاستشارات والتمثيل في القضايا والمنازعات.",
    image: "litigation",
    icon: "scale",
    slugs: [
      "litigation",
      "labor",
      "criminal-cases",
      "commercial-cases",
      "administrative-cases",
      "family-estates",
      "arbitration",
      "estates",
      "real-estate",
    ],
  },
  {
    id: "agreements",
    title: "العقود والاتفاقيات",
    summary: "صياغة ومراجعة العقود وتوضيح الالتزامات.",
    image: "contractReview",
    icon: "file",
    slugs: ["contracts", "company-contracts", "general-contracts"],
  },
];
