import { services } from "@/data/services";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/features/services/ServiceFilters";
import { getPracticeVisual } from "@/features/services/practiceVisuals";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function PracticeExplorer() {
  const [audience, setAudience] = useState("business");
  const [slug, setSlug] = useState(services[0].slug);
  const reduced = useReducedMotion();
  const options = useRef<HTMLDivElement>(null);
  const items = services.filter(
    (s) => s.audience === audience || s.audience === "both",
  );
  const selected = items.find((s) => s.slug === slug) || items[0];
  const visual = getPracticeVisual(selected.slug);
  useEffect(() => {
    const list = options.current?.firstElementChild;
    const active = list?.querySelector<HTMLElement>('[data-state="on"]');
    if (
      !(list instanceof HTMLElement) ||
      !active ||
      list.scrollWidth <= list.clientWidth
    )
      return;
    const box = list.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    if (item.left >= box.left && item.right <= box.right) return;
    list.scrollBy({
      left: item.left + item.width / 2 - box.left - box.width / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [selected.slug, reduced]);
  function changeAudience(value: string) {
    setAudience(value);
    setSlug(
      services.find((s) => s.audience === value)?.slug || services[0].slug,
    );
  }
  return (
    <div className="home-practice-explorer">
      <div className="home-practice-choices">
        <ToggleGroup
          value={audience}
          onValueChange={changeAudience}
          aria-label="اختر نوع احتياجك"
        >
          <ToggleGroupItem value="business">
            للشركات والمستثمرين
          </ToggleGroupItem>
          <ToggleGroupItem value="individual">للأفراد</ToggleGroupItem>
        </ToggleGroup>
        <div className="home-practice-options" ref={options}>
          <ToggleGroup
            value={selected.slug}
            onValueChange={setSlug}
            aria-label="اختر مجال الاستشارة"
          >
            {items.map((service) => (
              <ToggleGroupItem key={service.slug} value={service.slug}>
                <span>{service.title}</span>
                <span className="practice-choice-dot" aria-hidden="true" />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div
        className="home-practice-preview"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={selected.slug}
            initial="enter"
            animate="visible"
            exit="exit"
            variants={{
              enter: { opacity: reduced ? 1 : 0 },
              visible: {
                opacity: 1,
                transition: {
                  duration: reduced ? 0 : 0.25,
                  staggerChildren: reduced ? 0 : 0.1,
                },
              },
              exit: {
                opacity: 0,
                transition: { duration: reduced ? 0 : 0.12 },
              },
            }}
          >
            <figure>
              <motion.img
                variants={{
                  enter: {
                    transform: reduced
                      ? "none"
                      : "scale(1.08) translateY(12px)",
                  },
                  visible: {
                    transform: "scale(1) translateY(0px)",
                    transition: {
                      duration: reduced ? 0 : 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                src={visual.src}
                srcSet={`${visual.mobile} 720w, ${visual.src} 1254w`}
                sizes="(max-width: 700px) 100vw, 50vw"
                alt={visual.alt}
                style={{ objectPosition: visual.position }}
                width={1254}
                height={1254}
                loading="lazy"
              />
            </figure>
            <motion.div
              className="home-practice-summary"
              variants={{
                enter: {
                  opacity: reduced ? 1 : 0,
                  transform: reduced ? "none" : "translateY(20px)",
                },
                visible: {
                  opacity: 1,
                  transform: "translateY(0px)",
                  transition: { duration: reduced ? 0 : 0.35 },
                },
              }}
            >
              <h3>{selected.title}</h3>
              <p>{selected.short}</p>
              <Link to={`/services/${selected.slug}`} className="text-link">
                ما الذي تشملُه الخدمة؟
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
