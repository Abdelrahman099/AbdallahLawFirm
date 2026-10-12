import { services, type Service } from "@/data/services";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { getPracticeVisual } from "./practiceVisuals";
import "./practice.css";

export function PracticeCardGrid({ items = services }: { items?: Service[] }) {
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
                  alt={photo.alt}
                  style={{ objectPosition: photo.position }}
                  width={1254}
                  height={1254}
                  loading="lazy"
                />
                <div>
                  <span className="practice-audience">
                    {service.audience === "business"
                      ? "للأعمال والاستثمار"
                      : service.audience === "individual"
                        ? "للأفراد"
                        : "للأفراد والمنشآت"}
                  </span>
                  <h2>{service.title}</h2>
                  <p>{service.short}</p>
                  <span className="practice-card-link">عرض تفاصيل الخدمة</span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
