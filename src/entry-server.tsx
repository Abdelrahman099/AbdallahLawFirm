import { routes } from "@/app/paths";
import { office } from "@/config/office";
import { About } from "@/pages/about/AboutPage";
import Approach from "@/pages/approach/ApproachPage";
import Consultation from "@/pages/consultation/ConsultationPage";
import { Contact } from "@/pages/contact/ContactPage";
import { FAQPage } from "@/pages/faq/FAQPage";
import { Home } from "@/pages/home/HomePage";
import { Article } from "@/pages/insights/ArticlePage";
import { Insights } from "@/pages/insights/InsightsPage";
import { Privacy } from "@/pages/legal/PrivacyPage";
import { Terms } from "@/pages/legal/TermsPage";
import { NotFound } from "@/pages/NotFoundPage";
import { ServiceDetail } from "@/pages/services/ServiceDetailPage";
import { Services } from "@/pages/services/ServicesPage";
import { MotionConfig } from "motion/react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import DesignLab from "@/pages/design-lab/DesignLabPage";
export { office, routes };
const pages = {
  DesignLab,
  Home,
  About,
  Services,
  ServiceDetail,
  Consultation,
  FAQPage,
  Contact,
  Insights,
  Article,
  Privacy,
  Terms,
  NotFound,
  Approach,
};
export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <MotionConfig reducedMotion="user">
        <App pages={pages} />
      </MotionConfig>
    </StaticRouter>,
  );
}

export { createLanguage, languageFromPath, stripLanguage } from "./i18n/config";
