import type { PageRegistry } from "@/app/AppRoutes";
import { AppRoutes } from "@/app/AppRoutes";
import { RouteEffects } from "@/app/RouteEffects";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { Suspense } from "react";
import { MotionConfig } from "motion/react";

export default function App({ pages }: { pages?: PageRegistry }) {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        انتقل إلى المحتوى
      </a>
      <Preloader />
      <Header />
      <main id="main-content">
        <Suspense
          fallback={
            <div className="site-container min-h-[65vh] py-20" role="status">
              جارٍ تجهيز الصفحة…
            </div>
          }
        >
          <AppRoutes pages={pages} />
          <RouteEffects />
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
