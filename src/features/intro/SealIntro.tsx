import { useTranslate } from "@/i18n/useTranslate";
import { motion } from "motion/react";
import { BrandCaption } from "./BrandCaption";
export function SealIntro() {
  const { tx } = useTranslate();

  return (
    <div className="intro-seal-design">
      {[0, 1, 2].map((i) => (
        <motion.i
          key={i}
          className="intro-stamp-ripple"
          aria-hidden="true"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1.8 + i * 0.3], opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.4, delay: 0.55 + i * 0.15 }}
        />
      ))}
      <div className="intro-seal-ring">
        <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
          <motion.circle
            cx="120"
            cy="120"
            r="108"
            stroke="#B48753"
            strokeWidth="1"
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1, rotate: -90 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.circle
            cx="120"
            cy="120"
            r="98"
            stroke="currentColor"
            strokeWidth=".5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6 }}
          />
        </svg>
        <motion.img
          src="/brand/v4/mark-beige.svg"
          alt=""
          initial={{ scale: 2.4, rotate: -25, opacity: 0 }}
          animate={{ scale: [2.4, 0.88, 1], rotate: [-25, 4, 0], opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <BrandCaption />
      </motion.div>
      <span className="intro-seal-meta">{tx("جدة · منذ 2015")}</span>
    </div>
  );
}
