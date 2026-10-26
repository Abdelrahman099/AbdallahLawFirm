import { motion } from "motion/react";
import { BrandCaption } from "./BrandCaption";
export function LineIntro() {
  return (
    <div className="intro-line-design">
      <motion.svg
        viewBox="0 0 240 220"
        fill="none"
        aria-hidden="true"
        initial={{ scale: 0.65, y: 30 }}
        animate={{ scale: [0.65, 1.12, 1], y: [30, -5, 0] }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      >
        <motion.g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transformOrigin: "120px 110px" }}
          animate={{ rotate: [-14, 9, -4, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          {[
            ["M120 65V180M99 184H141", 7],
            ["M43 80C76 80 92 78 106 71Q120 64 134 71C148 78 164 80 197 80", 6],
            ["M60 81L26 132H94L60 81 M180 81L146 132H214L180 81", 3.6],
            ["M25 133Q60 170 95 133 M145 133Q180 170 215 133", 5],
          ].map(([d, w], i) => (
            <motion.path
              key={i}
              d={String(d)}
              strokeWidth={Number(w)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>
        <motion.g
          fill="#B48753"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <path d="M120 24L126 30L120 36L114 30Z M107 38L113 44L107 50L101 44Z M133 38L139 44L133 50L127 44Z" />
        </motion.g>
      </motion.svg>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <BrandCaption />
      </motion.div>
      <motion.div
        className="intro-fine-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      />
    </div>
  );
}
