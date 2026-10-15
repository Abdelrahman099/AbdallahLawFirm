import { brandVisual } from "@/components/brand/BrandImage";
export type PracticeVisual = {
  src: string;
  mobile?: string;
  alt: string;
  position?: string;
};
const photos = {
  business: {
    ...brandVisual("contracts"),
  },
  contracts: {
    ...brandVisual("contracts"),
  },
  property: {
    ...brandVisual("preparation"),
  },
  meeting: {
    ...brandVisual("consultation"),
  },
  books: {
    ...brandVisual("justice"),
  },
};
const visuals: Record<string, PracticeVisual> = {
  "company-formation": brandVisual("company"),
  "foreign-investment": brandVisual("investment"),
  contracts: brandVisual("contractReview"),
  litigation: brandVisual("litigation"),
  arbitration: brandVisual("arbitration"),
  labor: brandVisual("labor"),
  "real-estate": brandVisual("property"),
  "family-estates": brandVisual("family"),
  "criminal-cases": brandVisual("justice"),
  "commercial-cases": brandVisual("company"),
  "administrative-cases": brandVisual("litigation"),
  estates: brandVisual("family"),
  "company-contracts": brandVisual("contracts"),
  "general-contracts": brandVisual("contractReview"),
};
export const getPracticeVisual = (slug: string): PracticeVisual =>
  visuals[slug] || photos.contracts;
