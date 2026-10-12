import { useEffect, useState } from "react";

export function useHeaderScroll(pathname: string) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1023px)");
    let lastY = Math.max(0, window.scrollY);
    let direction = 0;
    let travel = 0;
    let frame = 0;

    setHidden(false);
    setScrolled(lastY > 24);

    const update = () => {
      frame = 0;
      const maxY = Math.max(
        0,
        document.documentElement.scrollHeight - innerHeight,
      );
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      const delta = y - lastY;
      const nextDirection = Math.sign(delta);
      setScrolled(y > 24);

      if (!mobile.matches || y <= 96) {
        setHidden(false);
        travel = 0;
      } else if (nextDirection !== 0) {
        if (nextDirection !== direction) travel = 0;
        travel += Math.abs(delta);
        if (travel >= (nextDirection > 0 ? 12 : 8)) {
          setHidden(nextDirection > 0);
        }
      }
      if (nextDirection !== 0) direction = nextDirection;
      lastY = y;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      travel = 0;
      direction = 0;
      setHidden(false);
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    mobile.addEventListener("change", resize);
    return () => {
      window.removeEventListener("scroll", schedule);
      mobile.removeEventListener("change", resize);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return { scrolled, hidden };
}
