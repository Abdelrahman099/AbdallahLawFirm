import { motion } from "motion/react";
import { HeroCopy, HeroPhoto } from "../HeroCopy";
export function PhotoCurtain() {
  return (
    <section className="hero-direction direction-curtain">
      <div className="curtain-copy">
        <HeroCopy
          title={
            <>
              حضور راسخ.
              <br />
              <em>مشورة أقرب.</em>
            </>
          }
        />
      </div>
      <motion.figure
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroPhoto position="62% 50%" />
        <figcaption>من جدة إلى أعمالك في المملكة</figcaption>
      </motion.figure>
    </section>
  );
}
