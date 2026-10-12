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
};
export const getPracticeVisual = (slug: string): PracticeVisual =>
  visuals[slug] || photos.contracts;
