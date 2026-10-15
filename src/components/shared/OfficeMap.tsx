import { useEffect, useRef, useState, type ReactNode } from "react";
import { office } from "@/config/office";
import "./office-map.css";

const place = "برج المستقبل، شارع الأمانة، حي البغدادية، جدة";
const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=16&hl=ar&output=embed`;
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import("./mountOfficeMap")
          .then(({ mountOfficeMap }) => {
            if (cancelled) return;
            const overlay =
              card.current &&
              getComputedStyle(card.current).position === "absolute";
            cleanup = mountOfficeMap(el, {
              ...office.location,
              name: "مكتب عبد الله الشهري",
              insetRight: overlay ? card.current!.offsetWidth + 24 : 0,
            });
            setState("ready");
          })
          .catch(() => setState("fallback"));
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div className="office-map" data-map-state={state} data-reveal>
      {state === "fallback" ? (
        <iframe
          className="office-map-frame"
          src={embedUrl}
          title="موقع المكتب على خرائط Google"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div
          className="office-map-frame office-map-canvas"
          role="region"
          aria-label="خريطة موقع المكتب"
        >
          <div ref={canvas} className="office-map-gl" />
        </div>
      )}
      {children && (
        <div ref={card} className="office-map-card">
          {children}
        </div>
      )}
    </div>
  );
}
