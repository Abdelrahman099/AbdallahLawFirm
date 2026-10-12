import { motion } from "motion/react";
import { BrandCaption } from "./BrandCaption";
export function PointsIntro() {
  return (
    <div className="intro-points-design">
      <motion.div
        className="intro-orbit-guide"
        aria-hidden="true"
        initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
        animate={{ scale: [0.4, 1, 0.3], opacity: [0, 0.5, 0], rotate: 90 }}
        transition={{ duration: 1.8 }}
      />
      <div className="intro-points" aria-hidden="true">
        {[
          [-95, 35],
          [0, -60],
          [95, 35],
        ].map(([x, y], i) => (
          <motion.i
            key={i}
            initial={{ x, y, rotate: 0, opacity: 0 }}
            animate={{
              x: [x, -x * 0.35, 0],
              y: [y, -y * 0.5, 0],
              rotate: [0, 225, 45],
              opacity: 1,
              scale: [1.8, 1.4, 1],
            }}
            transition={{
              delay: i * 0.12,
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 1.05, duration: 0.7 }}
      >
        <BrandCaption />
      </motion.div>
      <motion.p
        className="intro-manifesto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        فهم. وضوح. خطوة تالية.
      </motion.p>
    </div>
  );
}
