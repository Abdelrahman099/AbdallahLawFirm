import type { ComponentType } from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

export type PageRegistry = Record<
  | "Home"
  | "About"
  | "Services"
  | "ServiceDetail"
  | "Consultation"
  | "FAQPage"
  | "Contact"
  | "Insights"
  | "Article"
  | "Privacy"
  | "Terms"
  | "Approach"
  | "DesignLab"
  | "NotFound",
  // The design lab is a local comparison tool, excluded from the public sitemap.
  ComponentType
>;
const clientPages: PageRegistry = {
  DesignLab: lazy(() => import("@/pages/design-lab/DesignLabPage")),
  Home: lazy(() =>
    import("@/pages/home/HomePage").then((m) => ({ default: m.Home })),
  ),
  About: lazy(() =>
    import("@/pages/about/AboutPage").then((m) => ({ default: m.About })),
  ),
  Services: lazy(() =>
    import("@/pages/services/ServicesPage").then((m) => ({
      default: m.Services,
    })),
  ),
  ServiceDetail: lazy(() =>
    import("@/pages/services/ServiceDetailPage").then((m) => ({
      default: m.ServiceDetail,
    })),
  ),
  Consultation: lazy(() => import("@/pages/consultation/ConsultationPage")),
  FAQPage: lazy(() =>
    import("@/pages/faq/FAQPage").then((m) => ({ default: m.FAQPage })),
  ),
  Contact: lazy(() =>
    import("@/pages/contact/ContactPage").then((m) => ({ default: m.Contact })),
  ),
  Insights: lazy(() =>
    import("@/pages/insights/InsightsPage").then((m) => ({
      default: m.Insights,
    })),
  ),
  Article: lazy(() =>
    import("@/pages/insights/ArticlePage").then((m) => ({
      default: m.Article,
    })),
  ),
  Privacy: lazy(() =>
    import("@/pages/legal/PrivacyPage").then((m) => ({ default: m.Privacy })),
  ),
  Terms: lazy(() =>
    import("@/pages/legal/TermsPage").then((m) => ({ default: m.Terms })),
  ),
  Approach: lazy(() => import("@/pages/approach/ApproachPage")),
  NotFound: lazy(() =>
    import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFound })),
  ),
};

export function AppRoutes({ pages = clientPages }: { pages?: PageRegistry }) {
  return (
    <Routes>
      <Route path="/" element={<pages.Home />} />
      <Route path="/about" element={<pages.About />} />
      <Route path="/services" element={<pages.Services />} />
      <Route path="/services/:slug" element={<pages.ServiceDetail />} />
      <Route path="/consultation" element={<pages.Consultation />} />
      <Route path="/faq" element={<pages.FAQPage />} />
      <Route path="/contact" element={<pages.Contact />} />
      <Route path="/insights" element={<pages.Insights />} />
      <Route path="/insights/:slug" element={<pages.Article />} />
      <Route path="/privacy" element={<pages.Privacy />} />
      <Route path="/terms" element={<pages.Terms />} />
      <Route path="/approach" element={<pages.Approach />} />
      <Route path="/design-lab" element={<pages.DesignLab />} />
      <Route path="*" element={<pages.NotFound />} />
    </Routes>
  );
}
