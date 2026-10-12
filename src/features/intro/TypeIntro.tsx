import { motion } from "motion/react";
export function TypeIntro() {
  return (
    <div className="intro-type-design">
      <div className="intro-type-curtains" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.i
            key={i}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: 1.15,
              delay: i * 0.13,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </div>
      <span className="intro-type-overline">مكتب المحامي</span>
      <div className="intro-type-line">
        <motion.h2
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          عبد الله
        </motion.h2>
      </div>
      <div className="intro-type-line">
        <motion.h2
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
        >
          الشهري<span>.</span>
        </motion.h2>
      </div>
      <motion.div
        className="intro-type-rule"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        للمحاماة والاستشارات القانونية
      </motion.p>
    </div>
  );
}
