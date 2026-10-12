import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { HeroCopy } from "../HeroCopy";
import { ModelStage } from "../ModelStage";
export function ScrollSculpture() {
  const host = useRef<HTMLElement>(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 145]),
    rotate = useTransform(scrollYProgress, [0, 1], [-5, 12]);
  return (
    <section ref={host} className="hero-direction direction-scroll">
      <div className="site-container direction-scroll-grid">
        <HeroCopy
          title={
            <>
              كل قرار.
              <br />
              <em>يستحق اتزانًا.</em>
            </>
          }
        />
        <div className="scroll-object">
          <span className="object-index">01 / ATELIER</span>
          <motion.div
            className="scroll-sculpture"
            style={reduced ? undefined : { y, rotate }}
          >
            <ModelStage />
          </motion.div>
          <div className="object-footer">
            <span>اتزان الرؤية. وضوح الخطوة.</span>
            <span>حرّك المؤشر · مرّر لأسفل</span>
          </div>
        </div>
      </div>
      <div className="site-container direction-baseline">
        <span>عبد الله الشهري · للمحاماة والاستشارات القانونية</span>
        <span>جدة، منذ 2015</span>
      </div>
    </section>
  );
}
