import { IntroArtwork } from "@/features/intro/IntroArtwork";
import { getIntro } from "@/features/intro/variants";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { waitForHomeReady } from "./homeReadiness";

export function Preloader() {
  const location = useLocation();
  return location.pathname === "/" ? <HomeIntro key={location.key} /> : null;
}

function HomeIntro() {
  const reduced = useReducedMotion();
  const [variant, setVariant] = useState(getIntro("balance-onyx"));
  const [visible, setVisible] = useState(true);
  const close = useCallback(() => setVisible(false), []);
  useLayoutEffect(() => {
    try {
      setVariant(getIntro(localStorage.getItem("shehri-intro")));
    } catch {
      /* The approved default works without browser storage. */
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const minimum = new Promise<void>((resolve) => {
      timer = setTimeout(resolve, reduced ? 250 : variant.duration);
    });
    void Promise.all([minimum, waitForHomeReady(controller.signal)]).then(
      () => {
        if (!controller.signal.aborted) close();
      },
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [variant, reduced, close]);
  return (
    <AnimatePresence>
      {visible && (
        <IntroOverlay variant={variant} reduced={reduced} onDismiss={close} />
      )}
    </AnimatePresence>
  );
}

function IntroOverlay({
  variant,
  reduced,
  onDismiss,
}: {
  variant: ReturnType<typeof getIntro>;
  reduced: boolean | null;
  onDismiss: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    const background = document.querySelectorAll<HTMLElement>(
      ".site-header, main, .site-footer, .mobile-consult, .skip-link",
    );
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.classList.add("intro-open");
    document.documentElement.classList.remove("intro-booting");
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      background.forEach((element) => {
        element.inert = false;
      });
      document.body.classList.remove("intro-open");
      document
        .querySelector<HTMLElement>("main h1")
        ?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <motion.div
      className="preloader"
      role="dialog"
      aria-modal="true"
      aria-label="افتتاحية المكتب"
      initial={false}
      exit={reduced ? { opacity: 0 } : { y: "-100%" }}
      transition={{ duration: reduced ? 0.1 : 0.55, ease: [0.76, 0, 0.24, 1] }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onDismiss();
        if (event.key === "Tab") {
          event.preventDefault();
          closeButton.current?.focus();
        }
      }}
    >
      <IntroArtwork variant={variant.id} />
      <button
        ref={closeButton}
        className={`intro-skip ${variant.light ? "intro-skip-light" : ""}`}
        onClick={onDismiss}
      >
        تخطي الافتتاحية
      </button>
    </motion.div>
  );
}
