import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Scale, Columns3, Link2 } from "lucide-react";
import { SceneBoundary } from "@/components/three/SceneBoundary";
import { chapters } from "./chapters";
import "./showcase.css";
const Scene = lazy(() => import("./SculpturalScene"));
export function HeroShowcase() {
  const [index, setIndex] = useState(0),
    [enabled, setEnabled] = useState(false),
    [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();
  const chapter = chapters[index];
  const ready = useCallback(() => setLoaded(true), []);
  const failure = useCallback(() => {
    setEnabled(false);
    setLoaded(false);
  }, []);
  useEffect(() => {
    if (
      reduced ||
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData
    )
      return;
    const canvas = document.createElement("canvas");
    try {
      const gl = canvas.getContext("webgl2");
      if (!gl) return;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      return;
    }
    const timer = setTimeout(() => setEnabled(true), 300);
    return () => clearTimeout(timer);
  }, [reduced]);
  const next = (direction: number) =>
    setIndex((i) => (i + direction + chapters.length) % chapters.length);
  const Icon = [Scale, Columns3, Link2][index];
  return (
    <div
      className="hero-showcase"
      role="region"
      aria-label="قيم المكتب"
      aria-roledescription="عرض شرائح"
    >
      <div className="showcase-stage" data-chapter={chapter.id}>
        <div className="showcase-top">
          <span>منهجنا في العمل</span>
          <span dir="ltr">0{index + 1} / 03</span>
        </div>
        <span className="showcase-word" aria-hidden="true">
          {chapter.word}
        </span>
        <div className="showcase-model" aria-hidden="true">
          <div
            className={`showcase-fallback ${loaded && !reduced ? "is-hidden" : ""}`}
          >
            <Icon strokeWidth={0.7} />
          </div>
          {enabled && !reduced && (
            <SceneBoundary onFailure={failure}>
              <Suspense fallback={null}>
                <Scene chapter={chapter.id} ready={ready} failure={failure} />
              </Suspense>
            </SceneBoundary>
          )}
          <div className="sculpture-shadow" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={chapter.id}
            className="showcase-caption"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            aria-live="polite"
          >
            <h2>{chapter.title}</h2>
            <p>{chapter.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="showcase-controls">
        <div className="showcase-selectors">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setIndex(i)}
              aria-pressed={index === i}
              aria-label={"عرض " + c.label}
            >
              <span>0{i + 1}</span>
              <i />
              {c.label}
            </button>
          ))}
        </div>
        <div className="showcase-arrows">
          <button aria-label="الشريحة السابقة" onClick={() => next(-1)}>
            <ArrowRight size={18} />
          </button>
          <button aria-label="الشريحة التالية" onClick={() => next(1)}>
            <ArrowLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
