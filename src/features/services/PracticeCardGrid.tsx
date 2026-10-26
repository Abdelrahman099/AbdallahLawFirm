import { LocalizedLink as Link } from "@/i18n/links";
import { useTranslate } from "@/i18n/useTranslate";
import { services, type Service } from "@/data/services";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { getPracticeVisual } from "./practiceVisuals";
import "./practice.css";

export function PracticeCardGrid({ items = services }: { items?: Service[] }) {
  const { tx } = useTranslate();

  const reduced = useReducedMotion();
  return (
    <div className="practice-card-grid">
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((service) => {
          const photo = getPracticeVisual(service.slug);
          return (
            <motion.article
              key={service.slug}
              layout={!reduced}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
            >
              <Link to={`/services/${service.slug}`} className="practice-card">
                <img
                  src={photo.src}
                  srcSet={`${photo.mobile} 720w, ${photo.src} 1254w`}
                  sizes="(max-width: 760px) 100vw, 25vw"
                  alt={tx(photo.alt)}
                  style={{ objectPosition: photo.position }}
                  width={1254}
                  height={1254}
                  loading="lazy"
                />
                <div>
                  <span className="practice-audience">
                    {tx(
                      service.audience === "business"
                        ? "للأعمال والاستثمار"
                        : service.audience === "individual"
                          ? "للأفراد"
                          : "للأفراد والمنشآت",
                    )}
                  </span>
                  <h2>{tx(service.title)}</h2>
                  <p>{tx(service.short)}</p>
                  <span className="practice-card-link">
                    {tx("عرض تفاصيل الخدمة")}
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
