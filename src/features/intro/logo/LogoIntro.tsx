import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { BrandCaption } from "../BrandCaption";
import { LogoEmblem } from "./LogoEmblem";
import { useLogoTimeline } from "./useLogoTimeline";
import { logoIntroVariants, type LogoIntroId } from "./variants";
import "./logo-intro.css";
import { logoChoreography } from "./choreography";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function LogoIntro({
  variant,
  still = false,
}: {
  variant: LogoIntroId;
  still?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const reduced = hydrated && prefersReduced;
  const root = useLogoTimeline(variant, Boolean(still || reduced || !hydrated));
  const light = logoIntroVariants.find((item) => item.id === variant)?.light;
  const staticScene = still || reduced;
  return (
    <div
      ref={root}
      className={`logo-scene ${variant}${light ? " logo-scene-light" : ""}`}
      data-logo-intro={variant}
      data-logo-phase="rest"
    >
      <div className="logo-stage">
        {variant === "logo-seal" && (
          <img
            className="logo-echo"
            src="/brand/v4/mark-beige.svg"
            alt=""
            width="1000"
            height="850"
          />
        )}
        <LogoEmblem
          still={Boolean(staticScene)}
          strike={variant === "logo-balance"}
        />
      </div>
      <motion.div
        className="logo-caption"
        initial={staticScene ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: staticScene ? 0 : logoChoreography[variant].captionAt,
          duration: staticScene ? 0 : 0.4,
        }}
      >
        <BrandCaption />
        <motion.span
          className="logo-caption-rule"
          aria-hidden="true"
          initial={staticScene ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: staticScene ? 0 : logoChoreography[variant].captionAt + 0.1,
            duration: staticScene ? 0 : 0.4,
          }}
        />
      </motion.div>
    </div>
  );
}
