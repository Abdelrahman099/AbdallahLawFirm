import { motion } from "motion/react";
import { BrandCaption } from "./BrandCaption";
export function FolioIntro() {
  return (
    <motion.div
      className="intro-folio-design"
      initial={{ rotateX: 18, rotateZ: -7, scale: 0.6, y: 70 }}
      animate={{ rotateX: 0, rotateZ: 0, scale: 1, y: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="intro-folio-content">
        <img src="/brand/v4/mark-primary.svg" alt="" />
        <BrandCaption />
        <span>المسألة · الخيارات · الخطوة التالية</span>
      </div>
      <motion.div
        className="folio-leaf folio-right"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 100 }}
        transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>
          عبد الله
          <br />
          الشهري
        </span>
      </motion.div>
      <motion.div
        className="folio-leaf folio-left"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -100 }}
        transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
