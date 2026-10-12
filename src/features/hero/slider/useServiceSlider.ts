import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
export function useServiceSlider(count: number) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0),
    [playing, setPlaying] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [hidden, setHidden] = useState(false);
  const running = playing && !reduced && !hovered && !focused && !hidden;
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), 6500);
    return () => clearTimeout(timer);
  }, [index, running, count]);
  const go = (next: number) => setIndex((next + count) % count);
  return {
    index,
    go,
    reduced,
    playing,
    running,
    setPlaying,
    setHovered,
    setFocused,
  };
}
