import { useTranslate } from "@/i18n/useTranslate";
import type { PageRegistry } from "@/app/AppRoutes";
import { AppRoutes } from "@/app/AppRoutes";
import { RouteEffects } from "@/app/RouteEffects";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { ContactActions } from "@/components/layout/ContactActions";
import { Suspense } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export default function App({ pages }: { pages?: PageRegistry }) {
  return (
    <LanguageProvider>
      <AppContent pages={pages} />
    </LanguageProvider>
  );
}
function AppContent({ pages }: { pages?: PageRegistry }) {
  const { tx } = useTranslate();

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        {tx("انتقل إلى المحتوى")}
      </a>
      <Preloader />
      <Header />
      <main id="main-content">
        <Suspense
          fallback={
            <div className="site-container min-h-[65vh] py-20" role="status">
              {tx("جارٍ تجهيز الصفحة…")}
            </div>
          }
        >
          <AppRoutes pages={pages} />
          <RouteEffects />
        </Suspense>
      </main>
      <Footer />
      <ContactActions />
    </MotionConfig>
  );
}
