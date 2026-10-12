import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Scale, Link2 } from "lucide-react";
import { SceneBoundary } from "@/components/three/SceneBoundary";
import type { ChapterId } from "./chapters";
const Scene = lazy(() => import("./SculpturalScene"));
export function ModelStage({ chapter = "balance" }: { chapter?: ChapterId }) {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false),
    [loaded, setLoaded] = useState(false);
  const ready = useCallback(() => setLoaded(true), []),
    failure = useCallback(() => {
      setLoaded(false);
      setEnabled(false);
    }, []);
  useEffect(() => {
    if (reduced) return;
    const canvas = document.createElement("canvas");
    try {
      const gl = canvas.getContext("webgl2");
      if (!gl) return;
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      return;
    }
    const timer = setTimeout(() => setEnabled(true), 200);
    return () => clearTimeout(timer);
  }, [reduced]);
  const Icon = chapter === "care" ? Link2 : Scale;
  return (
    <div className="model-stage" aria-hidden="true">
      <div
        className={`model-fallback ${loaded && !reduced ? "is-hidden" : ""}`}
      >
        <Icon strokeWidth={0.7} />
      </div>
      {enabled && !reduced && (
        <SceneBoundary onFailure={failure}>
          <Suspense fallback={null}>
            <Scene chapter={chapter} ready={ready} failure={failure} />
          </Suspense>
        </SceneBoundary>
      )}
      <div className="model-ground" />
    </div>
  );
}
