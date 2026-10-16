import { useEffect, useRef, useState, type ReactNode } from "react";
import { office } from "@/config/office";
import "./office-map.css";

const place = "برج المستقبل، شارع الأمانة، حي البغدادية، جدة";
export const officeMapLink =
  office.mapUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;

function supportsWebGL() {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

export function OfficeMap({ children }: { children?: ReactNode }) {
  const canvas = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "ready" | "fallback">("idle");

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (!supportsWebGL()) {
      setState("fallback");
      return;
    }
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const fallback = () => {
      if (cancelled) return;
      cancelled = true;
      clearTimeout(timeout);
      cleanup?.();
      cleanup = undefined;
      setState("fallback");
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timeout = setTimeout(fallback, 15000);
        import("./mountOfficeMap")
          .then(({ mountOfficeMap }) => {
            if (cancelled) return;
            const overlay =
              card.current &&
              getComputedStyle(card.current).position === "absolute";
            cleanup = mountOfficeMap(el, {
              ...office.location,
              name: "مكتب عبد الله الشهري",
              href: officeMapLink,
              onUnavailable: fallback,
              insetRight: overlay ? card.current!.offsetWidth + 24 : 0,
              onReady: () => {
                if (cancelled) return;
                clearTimeout(timeout);
                setState("ready");
              },
            });
          })
          .catch(fallback);
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div className="office-map" data-map-state={state} data-reveal>
      <div
        className="office-map-frame office-map-canvas"
        role="region"
        aria-label="خريطة موقع المكتب"
        aria-busy={state === "idle"}
      >
        {state !== "fallback" && <div ref={canvas} className="office-map-gl" />}
        {state !== "ready" && (
          <div className="office-map-status">
            <img
              src="/brand/v4/mark-primary.svg"
              alt=""
              width="80"
              height="68"
            />
            <p role="status">
              {state === "idle"
                ? "جارٍ تحميل الخريطة"
                : "الخريطة غير متاحة حاليًا"}
            </p>
            {state === "fallback" && (
              <a
                href={officeMapLink}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                افتح العنوان في خرائط Google
              </a>
            )}
          </div>
        )}
        {state === "ready" && (
          <span className="office-map-approximate">موقع تقريبي</span>
        )}
      </div>
      {children && (
        <div ref={card} className="office-map-card">
          {children}
        </div>
      )}
    </div>
  );
}
